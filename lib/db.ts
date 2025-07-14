// lib/db.ts
import mysql from 'mysql2/promise';

interface ClaimRecord {
  id: number;
  username: string;
  address: string;
  hasClaimed: number;
  lastTimeClaimed: Date | null;
  totalClaimed: number;
  createdAt: Date;
  updatedAt: Date;
}

// Configuração do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z' // Usar 'Z' para UTC em vez de 'utc'
});

// Testar conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    connection.release();
    
    // Verificar se as tabelas existem
    const [claimsTable]: any = await pool.query(
      "SHOW TABLES LIKE 'claims'"
    );
    
    if (claimsTable.length === 0) {
      console.error('⛔ ATENÇÃO: A tabela "claims" não foi encontrada!');
      await initializeDatabase();
    } else {
      console.log('✅ Tabela "claims" encontrada');
    }

    const [supplyTable]: any = await pool.query(
      "SHOW TABLES LIKE 'token_supply'"
    );
    
    if (supplyTable.length === 0) {
      console.log('ℹ️ Tabela token_supply não encontrada. Criando...');
      await initializeTokenSupply();
    } else {
      console.log('✅ Tabela "token_supply" encontrada');
    }
  } catch (error) {
    console.error('⛔ Erro ao conectar ao banco de dados:', error);
    throw new Error('Falha na conexão com o banco de dados');
  }
}

// Criar tabelas se não existirem
async function initializeDatabase() {
  const createClaimsTable = `
    CREATE TABLE IF NOT EXISTS claims (
      address VARCHAR(42) PRIMARY KEY
      username VARCHAR(255) NOT NULL,
      hasClaimed TINYINT DEFAULT 0,
      lastTimeClaimed DATETIME NULL,
      totalClaimed INT DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  
  try {
    await pool.query(createClaimsTable);
    console.log('✅ Tabela claims criada/verificada com sucesso');
  } catch (error) {
    console.error('⛔ Erro ao criar tabela claims:', error);
    throw error;
  }
}

// Criar tabela de supply se não existir
async function initializeTokenSupply() {
  const createSupplyTable = `
    CREATE TABLE IF NOT EXISTS token_supply (
      initial_supply BIGINT NOT NULL DEFAULT 1000000,
      distributed_supply BIGINT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  
  try {
    await pool.query(createSupplyTable);
    console.log('✅ Tabela token_supply criada com sucesso');
    
    // Inserir registro inicial se não existir
    const [rows]: any = await pool.query('SELECT * FROM token_supply');
    if (rows.length === 0) {
      await pool.query('INSERT INTO token_supply (initial_supply) VALUES (1000000)');
      console.log('✅ Registro inicial de token_supply inserido');
    }
  } catch (error) {
    console.error('⛔ Erro ao criar tabela token_supply:', error);
    throw error;
  }
}

// Inicializar banco de dados e testar conexão
testDatabaseConnection()
  .catch(err => console.error('⛔ Erro na inicialização do banco:', err));

// Funções de acesso ao banco de dados
export const db = {
  async getClaimRecord(address: string): Promise<ClaimRecord | null> {
  
    if (address){
    	console.error('tem  address: ', address);
    }else{
    	console.error('não tem address');
    }
    // Validar formato do endereço
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      console.error('⛔ Formato de endereço inválido:', address);
      return null;
    }
    
    try {
      console.log(`🔍 Buscando registro para: ${address}`);
      const [rows]: any = await pool.query(
        'SELECT * FROM claims WHERE address = ?',
        [address]
      );
      
      if (rows.length > 0) {
        console.log('✅ Registro encontrado:', rows[0]);
        return rows[0];
      }
      
      console.log('ℹ️ Nenhum registro encontrado para', address);
      return null;
    } catch (error) {
      console.error('⛔ Erro ao buscar registro:', error);
      throw error;
    }
  },

  async createOrUpdateClaimRecord(address: string, username: string) {
    // Validar inputs
    if (!address || !username) {
      throw new Error('Endereço e username são obrigatórios');
    }
    
    try {
      const existingRecord = await this.getClaimRecord(address);
      
      if (existingRecord) {
        console.log('ℹ️ Registro já existe, retornando existente');
        return existingRecord;
      }
      
      console.log(`➕ Criando novo registro para: ${address} (${username})`);
      const [result]: any = await pool.query(
        'INSERT INTO claims (address, username) VALUES (?, ?)',
        [address, username]
      );
      
      console.log('✅ Novo registro criado, ID:', result.insertId);
      return await this.getClaimRecord(address);
    } catch (error) {
      console.error('⛔ Erro ao criar/atualizar registro:', error);
      throw error;
    }
  },

  async updateClaimStatus(address: string, claimAmount: number = 1) {
    try {
      console.log(`🔄 Atualizando status para: ${address}`);
      const now = new Date();
      
      // Iniciar transação
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Atualizar o registro do usuário
        await connection.query(
          `UPDATE claims 
           SET hasClaimed = 1, 
               lastTimeClaimed = ?, 
               totalClaimed = totalClaimed + 1 
           WHERE address = ?`,
          [now, address]
        );
        
        // Atualizar o supply distribuído
        await connection.query(
          `UPDATE token_supply 
           SET distributed_supply = distributed_supply + ?`,
          [claimAmount]
        );
        
        // Commit da transação
        await connection.commit();
        console.log('✅ Status e supply atualizados com sucesso');
      } catch (error) {
        // Rollback em caso de erro
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('⛔ Erro ao atualizar status:', error);
      throw error;
    }
  },

async canUserClaim(address: string): Promise<boolean> {
  console.log(`🔍 Verificando se pode claim: ${address}`);
  
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    console.error('❌ Endereço inválido:', address);
    return false;
  }
  
  try {
    const record = await this.getClaimRecord(address);
    
    if (!record) {
      console.log('✅ Pode claim: nenhum registro encontrado');
      return true;
    }
    
    console.log('📝 Registro encontrado:', {
      lastTimeClaimed: record.lastTimeClaimed,
      totalClaimed: record.totalClaimed
    });

    if (record.totalClaimed === 0) {
      console.log('✅ Pode claim: nunca fez claim antes');
      return true;
    }
    
    if (!record.lastTimeClaimed) {
      console.log('⚠️ Pode claim: sem data de último claim');
      return true;
    }
    
    const lastClaimDate = record.lastTimeClaimed instanceof Date 
      ? record.lastTimeClaimed 
      : new Date(record.lastTimeClaimed);
    
    if (isNaN(lastClaimDate.getTime())) {
      console.error('❌ Data inválida:', record.lastTimeClaimed);
      return true;
    }
    
    const now = new Date();
    const diffMs = now.getTime() - lastClaimDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    console.log(`⏱️ Último claim: ${lastClaimDate}`);
    console.log(`⏱️ Agora: ${now}`);
    console.log(`⏱️ Diferença: ${diffHours.toFixed(2)} horas`);
    
    const canClaim = diffHours >= 24;
    console.log(`ℹ️ Pode claim: ${canClaim}`);
    
    return canClaim;
  } catch (error) {
    console.error('❌ Erro em canUserClaim:', error);
    return false;
  }
},

  // Obter dados do token supply
  async getTokenSupply() {
    try {
      const [rows]: any = await pool.query('SELECT * FROM token_supply');
      if (rows.length > 0) {
        const supply = rows[0];
        return {
          initial: supply.initial_supply,
          distributed: supply.distributed_supply,
          available: supply.initial_supply - supply.distributed_supply
        };
      }
      return null;
    } catch (error) {
      console.error('⛔ Erro ao buscar token supply:', error);
      throw error;
    }
  },

  // Função adicional para depuração
  async getAllClaims() {
    try {
      const [rows]: any = await pool.query('SELECT * FROM claims');
      return rows;
    } catch (error) {
      console.error('⛔ Erro ao buscar todos os registros:', error);
      return [];
    }
  }
};
