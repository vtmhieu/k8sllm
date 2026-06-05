import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'K8sLLM Labs Kubernetes LLM challenge environment';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  const gridLines = Array.from({ length: 18 }, (_, index) => index);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background: '#08100f',
          color: '#eef7f3',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif',
          height: '100%',
          justifyContent: 'space-between',
          padding: 64,
          position: 'relative',
          width: '100%',
        }}
      >
        {gridLines.map((index) => (
          <div
            key={`v-${index}`}
            style={{
              backgroundColor: 'rgba(153,246,228,0.08)',
              height: 630,
              left: index * 68,
              position: 'absolute',
              top: 0,
              width: 1,
            }}
          />
        ))}
        {gridLines.slice(0, 10).map((index) => (
          <div
            key={`h-${index}`}
            style={{
              backgroundColor: 'rgba(153,246,228,0.07)',
              height: 1,
              left: 0,
              position: 'absolute',
              top: index * 68,
              width: 1200,
            }}
          />
        ))}
        <div
          style={{
            backgroundColor: 'rgba(45,212,191,0.16)',
            borderRadius: 220,
            height: 360,
            left: -80,
            position: 'absolute',
            top: -80,
            width: 360,
          }}
        />
        <div
          style={{
            backgroundColor: 'rgba(251,191,36,0.12)',
            borderRadius: 240,
            bottom: -120,
            height: 420,
            position: 'absolute',
            right: -90,
            width: 420,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div
            style={{
              border: '1px solid rgba(153,246,228,0.38)',
              color: '#99f6e4',
              display: 'flex',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              padding: '12px 18px',
              textTransform: 'uppercase',
            }}
          >
            K8sLLM Labs
          </div>
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#cbd5e1',
              display: 'flex',
              fontSize: 22,
              fontWeight: 700,
              padding: '12px 18px',
            }}
          >
            Kubernetes + LLM
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'relative' }}>
          <h1
            style={{
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 0.94,
              margin: 0,
              maxWidth: 920,
            }}
          >
            Interactive Kubernetes LLM Challenges
          </h1>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: 30,
              lineHeight: 1.25,
              margin: 0,
              maxWidth: 900,
            }}
          >
            Practice vLLM, GPU node pools, RAG, observability, rollout checks, and production readiness.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
          {['vLLM', 'RAG', 'GPU scheduling', 'Observability'].map((item) => (
            <div
              key={item}
              style={{
                background: 'rgba(153,246,228,0.08)',
                border: '1px solid rgba(153,246,228,0.24)',
                color: '#ccfbf1',
                display: 'flex',
                fontSize: 22,
                fontWeight: 800,
                padding: '13px 18px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
