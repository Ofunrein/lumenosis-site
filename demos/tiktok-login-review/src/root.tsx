import {Composition} from 'remotion';
import {TikTokLoginReview} from './tiktok-login-review';

export const Root = () => (
  <Composition
    id="TikTokLoginReview"
    component={TikTokLoginReview}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
  />
);
