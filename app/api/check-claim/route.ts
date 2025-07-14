// app/api/check-claim/route.ts
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  console.log('🔔 GET /api/check-claim chamado');
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  console.log('📬 Parâmetro address:', address);

  if (!address) {
    console.log('❌ Erro: Endereço inválido');
    return new Response(
      JSON.stringify({ error: 'Endereço inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    console.log('🔍 Buscando dados para:', address);
    const canClaim = await db.canUserClaim(address);
    const record = await db.getClaimRecord(address);
    
    console.log('📊 Resultados:', { canClaim, record });

    const lastClaimTime = record?.lastTimeClaimed instanceof Date 
      ? record.lastTimeClaimed.getTime() 
      : record?.lastTimeClaimed 
        ? new Date(record.lastTimeClaimed).getTime()
        : null;
    
    const responseData = { 
      canClaim, 
      lastClaimTime,
      totalClaimed: record?.totalClaimed || 0
    };

    console.log('📤 Enviando resposta:', responseData);
    
    return new Response(
      JSON.stringify(responseData),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('❌ Erro ao verificar status de claim:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
