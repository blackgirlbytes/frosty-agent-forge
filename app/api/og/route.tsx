import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  // Fetch the goose logo
  const logoUrl = new URL('/goose-logo.png', request.url);
  const logoData = await fetch(logoUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
          position: 'relative',
        }}
      >
        {/* Aurora effect background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Snowflakes */}
        <div style={{ position: 'absolute', top: '10%', left: '15%', fontSize: '40px', opacity: 0.6, display: 'flex' }}>❄</div>
        <div style={{ position: 'absolute', top: '20%', right: '20%', fontSize: '30px', opacity: 0.5, display: 'flex' }}>❄</div>
        <div style={{ position: 'absolute', bottom: '15%', left: '25%', fontSize: '35px', opacity: 0.4, display: 'flex' }}>❄</div>
        <div style={{ position: 'absolute', bottom: '25%', right: '15%', fontSize: '45px', opacity: 0.5, display: 'flex' }}>❄</div>
        <div style={{ position: 'absolute', top: '40%', left: '10%', fontSize: '25px', opacity: 0.3, display: 'flex' }}>❄</div>
        <div style={{ position: 'absolute', top: '60%', right: '10%', fontSize: '30px', opacity: 0.4, display: 'flex' }}>❄</div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            padding: '80px',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#f8fafc',
              marginBottom: '20px',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            Advent of AI
          </div>

          {/* Subtitle with gradient */}
          <div
            style={{
              fontSize: '90px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #06b6d4, #0ea5e9)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            Build with goose
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '36px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
              marginBottom: '50px',
              display: 'flex',
            }}
          >
            17 hands-on AI engineering challenges
          </div>

          {/* Goose Logo */}
          <img
            // @ts-ignore - ImageResponse requires arrayBuffer for images
            src={logoData}
            alt="goose logo"
            width="120"
            height="120"
            style={{
              borderRadius: '20px',
            }}
          />
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(to right, #06b6d4, #0ea5e9, #06b6d4)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
