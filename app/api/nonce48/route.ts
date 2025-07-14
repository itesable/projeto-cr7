import { NextRequest } from 'next/server';

// Gera um nonce uint48 no formato hexadecimal (0x...)
function generateUint48Hex(): string {
  // Cria um buffer de 6 bytes (48 bits)
  const buffer = new Uint8Array(6);
  
  // Preenche com valores aleatórios
  crypto.getRandomValues(buffer);
  
  // Converte para hexadecimal
  let hex = '0x';
  for (let i = 0; i < buffer.length; i++) {
    hex += buffer[i].toString(16).padStart(2, '0');
  }
  
  return hex;
}

export async function GET() {
  try {
    const nonce = generateUint48Hex();
    
    // DEBUG: Log do nonce gerado
    console.log('Nonce gerado:', nonce);
    
    return new Response(
      JSON.stringify({ nonce }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0' // Desativa cache
        } 
      }
    );
  } catch (error) {
    console.error('Erro ao gerar nonce:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}