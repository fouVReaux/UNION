import { Experience } from '@soundworks/core/client';
import { render, html } from 'lit-html';
import renderAppInitialization from '../views/renderAppInitialization';
import StepEngine from './StepEngine';
import AudioBus from './AudioBus';
import masters from 'waves-masters';

class PlayerExperience extends Experience {
  constructor(client, config = {}, $container, audioContext) {
    super(client);

    this.config = config;
    this.$container = $container;
    this.audioContext = audioContext;

    // require services
    this.sync = this.require('sync');
    this.audioBufferLoader = this.require('audio-buffer-loader');
    this.checkin = this.require('checkin');
    this.platform = this.require('platform');

    this.engines = {};

    // default initialization views
    renderAppInitialization(client, config, $container);
  }

  async start() {
    super.start();

    this.globals = await this.client.stateManager.attach('globals');

    this.listeners = {
      toggleStep: (scoreName, index) => {
        // ... update score when a checkbox is clicked
      },
    };

    const scheduler = new masters.Scheduler(() => this.sync.getSyncTime(), {
      currentTimeToAudioTimeFunction: syncTime => {
        return this.sync.getLocalTime(syncTime);
      },
    });

    // init engines according to score

    // wait for state updates
    this.globals.subscribe(updates => {
      // ....

      this.renderApp();
    });

    this.renderApp();
  }

  renderApp() {
    const scores = this.globals.get('scores');
    const clientIndex = this.checkin.state.get('index');

    render(html`
      <div class="screen" style="box-sizing: border-box; padding: 20px">
        <h1 class="title">index: ${clientIndex}</h1>

        <!-- display score and bind events -->
      </div>
    `, this.$container);
  }
}

export default PlayerExperience;
