import { NextResponse } from 'next/server';
import { getSignupStats } from '@/lib/db';

/**
 * GET /api/signups/count
 * Returns the total number of signups
 */
export async function GET() {
  try {
    const stats = getSignupStats();
    
    return NextResponse.json({
      success: true,
      count: stats.total,
      subscribed: stats.subscribed,
      unsubscribed: stats.unsubscribed
    });
  } catch (error) {
    console.error('❌ Error fetching signup count:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch signup count',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
