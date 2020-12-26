import { TNSPlayer as TNSAVAudioPlayer } from './player';
import { TNSPlayer as TNSAVPlayer } from './janstoeckler';
import { AudioPlayerOptions } from '../options';
import { TNSPlayerI } from '../common';

export class TNSPlayer implements TNSPlayerI {
  private player: TNSPlayerI;

  get ios(): any {
    return this.player && this.player.ios;
  }

  get volume(): any {
    return this.player ? this.player.volume : 0;
  }

  set volume(volume: any) {
    if (this.player) {
      this.player.volume = volume;
    }
  }

  playFromFile(options: AudioPlayerOptions): Promise<any> {
    this.player = new TNSAVAudioPlayer();
    return this.player.playFromFile(options);
  }

  playFromUrl(options: AudioPlayerOptions): Promise<any> {
    this.player = new TNSAVPlayer();
    return this.player.playFromUrl(options);
  }

  play(): Promise<boolean> {
    return this.player ? this.player.play() : Promise.reject();
  }

  pause(): Promise<boolean> {
    return this.player ? this.player.pause() : Promise.reject();
  }

  seekTo(time: number): Promise<boolean> {
    return this.player ? this.player.seekTo(time) : Promise.reject();
  }

  dispose(): Promise<boolean> {
    return (this.player ? this.player.dispose() : Promise.reject())
      .catch(() => false)
      .then((retval) => {
        this.player = undefined;
        return retval;
      });
  }

  isAudioPlaying(): boolean {
    return this.player ? this.player.isAudioPlaying() : false;
  }

  getAudioTrackDuration(): Promise<string> {
    return this.player ? this.player.getAudioTrackDuration() : Promise.reject();
  }

  get currentTime(): number {
    return this.player ? this.player.currentTime : 0;
  }
}
