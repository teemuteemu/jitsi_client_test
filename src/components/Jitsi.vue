<template>
  <div class="hello">
    <h1>Voihan jitsi</h1>
  </div>
</template>

<script>
export default {
  name: 'Jitsi',
  props: {
  },
  methods: {
    onConnectionSuccess: function() {
      console.log('SUCCESS!');
      //eslint-disable-next-line
      debugger
    },
    onConnectionFailed: function() {
      console.log('Fail!');
      //eslint-disable-next-line
      debugger
    },
    onConnectionDisconnected: function() {
      console.log('Disconnected!');
      //eslint-disable-next-line
      debugger
    },
  },
  mounted: async function() {
    const {
      CONNECTION_ESTABLISHED,
      CONNECTION_FAILED,
      CONNECTION_DISCONNECTED,
    } = window.JitsiMeetJS.events.connection;

    const options = {
      serviceUrl: '//localhost:8080/http-bind',
    };

    const connectionOptions = {
      id: 'meet.jitsi',
    };

    window.JitsiMeetJS.init();
    const connection = new window.JitsiMeetJS.JitsiConnection(null, null, options);

    connection.addEventListener(CONNECTION_ESTABLISHED, this.onConnectionSuccess);
    connection.addEventListener(CONNECTION_FAILED, this.onConnectionFailed);
    connection.addEventListener(CONNECTION_DISCONNECTED, this.onConnectionDisconnected);

    await connection.connect(connectionOptions);
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
