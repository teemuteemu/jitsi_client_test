<template>
  <div class="hello">
    <h1>Voihan jitsi</h1>
    <video autoplay='1' ref='localVideo' />
    <audio autoplay='1' muted='true' ref='localAudio' />
  </div>
</template>

<script>
export default {
  name: 'Jitsi',
  props: {
  },
  state: {
    connection: null,
  },
  methods: {
    connect: async function() {
      const {
        CONNECTION_ESTABLISHED,
        CONNECTION_FAILED,
        CONNECTION_DISCONNECTED,
      } = window.JitsiMeetJS.events.connection;

      const options = {
        serviceUrl: '//localhost:8080/http-bind',
      };

      window.JitsiMeetJS.init();

      this.connection = new window.JitsiMeetJS.JitsiConnection(null, null, options);
      this.connection.addEventListener(CONNECTION_ESTABLISHED, this.onConnectionSuccess);
      this.connection.addEventListener(CONNECTION_FAILED, this.onConnectionFailed);
      this.connection.addEventListener(CONNECTION_DISCONNECTED, this.onConnectionDisconnected);

      try {
        await this.connection.connect({ id: 'meet.jitsi' });
        const tracks = await window.JitsiMeetJS.createLocalTracks({ devices: ['video', 'audio'] });

        this.onLocalTracks(tracks);
      } catch (err) {
        console.error('TODO: handle connection error');
        console.error(err);
      }
    },
    onConnectionSuccess: async function() {
      const {
        TRACK_ADDED,
        CONFERENCE_ADDED,
      } = window.JitsiMeetJS.events.conference;

      const conferenceOptions = {
        openBridgeChannel: true,
      };

      const room = this.connection.initJitsiConference('fancy_conference_name', conferenceOptions);
      room.addEventListener(TRACK_ADDED, this.onTrackAdded);
      room.addEventListener(CONFERENCE_ADDED, this.onConferenceAdded);

      room.join();
    },
    onConnectionFailed: function() {
      console.log('Fail!');
    },
    onConnectionDisconnected: function() {
      console.log('Disconnected!');
    },
    onLocalTracks: function(tracks) {
      tracks.forEach(track => {
        switch(track.getType()) {
          case 'video':
            track.attach(this.$refs.localVideo);
            break;

          case 'audio':
            track.attach(this.$refs.localAudio);
            break;

          default:
            console.log('eh?');
            break;
        }
      });
    },
    onTrackAdded: function() {
      // eslint-disable-next-line
      debugger
    },
    onConferenceAdded: function() {
      // eslint-disable-next-line
      debugger
    },
  },
  mounted: async function() {
    this.connect();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
