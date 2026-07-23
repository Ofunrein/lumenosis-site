import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const ease = Easing.bezier(0.22, 1, 0.36, 1);

const fade = (frame: number, start: number, end = start + 18) =>
  interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

const Browser = ({children}: {children: React.ReactNode}) => (
  <div style={{width: 1420, height: 800, borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: '0 38px 100px rgba(0,0,0,.34)'}}>
    <div style={{height: 58, background: '#f5f5f6', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 12}}>
      <span style={{width: 12, height: 12, borderRadius: 12, background: '#ff5f57'}} />
      <span style={{width: 12, height: 12, borderRadius: 12, background: '#febc2e'}} />
      <span style={{width: 12, height: 12, borderRadius: 12, background: '#28c840'}} />
      <div style={{marginLeft: 26, height: 32, flex: 1, borderRadius: 8, background: '#e9e9eb', color: '#74747c', fontFamily: 'Arial', fontSize: 17, display: 'flex', alignItems: 'center', paddingLeft: 16}}>app.lumenosis.com</div>
    </div>
    {children}
  </div>
);

const Brand = () => <div style={{display: 'flex', alignItems: 'center', gap: 13}}><Img src={staticFile('lumenosis-icon.png')} style={{width: 38, height: 38, borderRadius: 10}} /><span style={{fontFamily: 'Arial', color: '#17171b', fontSize: 28, fontWeight: 700}}>lumenosis</span></div>;

const LoginScreen = ({opacity}: {opacity: number}) => <div style={{opacity, height: 742, padding: '42px 58px', fontFamily: 'Arial', color: '#17171b'}}>
  <Brand />
  <div style={{display: 'flex', minHeight: 570, alignItems: 'center', justifyContent: 'space-between'}}>
    <div style={{width: 610}}>
      <div style={{fontSize: 54, letterSpacing: -2.5, fontWeight: 700, lineHeight: 1.05}}>Welcome back.</div>
      <p style={{fontSize: 22, color: '#65656d', lineHeight: 1.45, marginTop: 22}}>Connect the tools your team uses to keep every lead moving.</p>
      <button style={{marginTop: 36, border: '1px solid #dedee5', background: '#fff', borderRadius: 12, padding: '18px 28px', fontWeight: 700, fontSize: 21, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 6px 20px rgba(0,0,0,.08)'}}><span style={{fontSize: 30, color: '#fe2c55'}}>♪</span> Continue with TikTok</button>
      <p style={{fontSize: 15, color: '#8a8a92', marginTop: 18}}>For internal Lumenosis team access</p>
    </div>
    <div style={{width: 430, height: 380, borderRadius: 26, background: 'linear-gradient(145deg,#25194d,#101014)', padding: 38, boxSizing: 'border-box', color: '#fff'}}>
      <div style={{fontSize: 17, color: '#c8bdff', fontWeight: 700, letterSpacing: 1}}>CONNECTED WORKSPACE</div>
      <div style={{marginTop: 78, fontSize: 31, fontWeight: 700, lineHeight: 1.12}}>One inbox.<br />Every lead.</div>
      <div style={{height: 7, background: '#8968ff', width: 124, marginTop: 30, borderRadius: 10}} />
    </div>
  </div>
</div>;

const ConsentScreen = ({opacity}: {opacity: number}) => <div style={{opacity, height: 742, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f8', fontFamily: 'Arial'}}>
  <div style={{width: 620, borderRadius: 22, background: '#fff', padding: '48px 52px', boxSizing: 'border-box', boxShadow: '0 16px 45px rgba(0,0,0,.12)'}}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}><Img src={staticFile('lumenosis-icon.png')} style={{width: 62, height: 62, borderRadius: 15}} /><span style={{fontSize: 39, color: '#9b9ba1'}}>↔</span><div style={{width: 62, height: 62, display: 'grid', placeItems: 'center', background: '#111', borderRadius: 16, color: '#fff', fontSize: 45}}>♪</div></div>
    <h1 style={{textAlign: 'center', margin: '33px 0 15px', fontSize: 32, letterSpacing: -.8}}>Authorize Lumenosis</h1>
    <p style={{fontSize: 19, lineHeight: 1.45, color: '#5d5d64', textAlign: 'center'}}>Lumenosis is requesting access to your basic TikTok profile information.</p>
    <div style={{marginTop: 28, background: '#f6f6f8', padding: '19px 21px', borderRadius: 12, fontSize: 18, fontWeight: 700}}>✓ user.info.basic <span style={{fontWeight: 400, color: '#73737a'}}>Basic profile information</span></div>
    <button style={{marginTop: 30, width: '100%', padding: '17px', border: 0, borderRadius: 10, background: '#111', color: '#fff', fontSize: 19, fontWeight: 700}}>Authorize</button>
    <p style={{textAlign: 'center', color: '#85858b', fontSize: 14, marginTop: 19}}>Sandbox environment · You can revoke access at any time</p>
  </div>
</div>;

const ConnectedScreen = ({opacity}: {opacity: number}) => <div style={{opacity, height: 742, padding: '42px 58px', fontFamily: 'Arial'}}>
  <Brand />
  <div style={{display: 'flex', minHeight: 570, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{width: 780, textAlign: 'center'}}>
      <div style={{width: 88, height: 88, borderRadius: 44, margin: '0 auto', display: 'grid', placeItems: 'center', background: '#e9e3ff', color: '#6b48db', fontSize: 44}}>✓</div>
      <h1 style={{fontSize: 51, margin: '30px 0 14px', letterSpacing: -2}}>TikTok connected</h1>
      <p style={{fontSize: 22, color: '#66666e', lineHeight: 1.45}}>Your Lumenosis workspace is linked to your authorized TikTok account.</p>
      <div style={{margin: '35px auto 0', width: 500, border: '1px solid #e5e5e8', borderRadius: 16, padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left'}}><div><div style={{fontWeight: 700, fontSize: 20}}>TikTok</div><div style={{color: '#777780', marginTop: 6}}>Connected with basic profile access</div></div><div style={{color: '#2e9b67', fontWeight: 700}}>Active</div></div>
    </div>
  </div>
</div>;

export const TikTokLoginReview = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = spring({frame: frame - 20, fps, config: {damping: 200}});
  const first = fade(frame, 0);
  const consent = fade(frame, 270);
  const complete = fade(frame, 570);
  return <AbsoluteFill style={{background: 'radial-gradient(circle at 18% 20%,#4e2c9c 0,#1e133a 36%,#0d0d10 100%)', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{position: 'absolute', top: 54, color: 'rgba(255,255,255,.72)', fontFamily: 'Arial', fontWeight: 700, fontSize: 18, letterSpacing: 1.7}}>LUMENOSIS × TIKTOK · SANDBOX LOGIN KIT WALKTHROUGH</div>
    <div style={{transform: `scale(${0.94 + pulse * .06})`}}>
      {frame < 300 && <Browser><LoginScreen opacity={first} /></Browser>}
      {frame >= 270 && frame < 600 && <Browser><ConsentScreen opacity={consent} /></Browser>}
      {frame >= 570 && <Browser><ConnectedScreen opacity={complete} /></Browser>}
    </div>
    <div style={{position: 'absolute', bottom: 38, color: 'rgba(255,255,255,.58)', fontFamily: 'Arial', fontSize: 16}}>Demonstration prototype · Login Kit · user.info.basic</div>
  </AbsoluteFill>;
};
