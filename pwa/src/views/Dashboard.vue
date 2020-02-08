<template>
  <div id="dashboard">
    <h1 class="page-title">Dashboard</h1>
    <div class="half-split">
      <div class="half half-left">
        <div class="card">
          <h2>Hours</h2>
          <div class="hour-report">
            <span class="hour-report-title">This week:</span>
            <span class="hour-report-time">{{ summary.week }}</span>
          </div>
          <div class="hour-report">
            <span class="hour-report-title">This month:</span>
            <span class="hour-report-time">{{ summary.month }}</span>
          </div>
          <div class="hour-report">
            <span class="hour-report-title">Total:</span>
            <span class="hour-report-time">{{ summary.total }}</span>
          </div>
        </div>
        <div class="card">
          <h2>Timers</h2>
          <div class="new-timer" v-if="displayNewTimer">
            <input
              type="text"
              class="input-type input-text new-timer-text"
              placeholder="Task name"
              v-model="newTimerTitle"
              @keyup.enter="startNewTimer()"
            />
            <input
              type="button"
              value="Start"
              class="input-type input-button"
              @click="startNewTimer()"
            />
            <a
              href="#"
              @click.prevent="displayNewTimer = false"
              class="dismiss-new-timer"
              >❌</a
            >
          </div>
          <input
            type="button"
            value="Start New Timer"
            class="input-type input-button"
            @click="displayNewTimer = true"
            v-else
          />
          <hr />
          <div class="reports" v-for="timer in timers" v-bind:key="timer.rowid">
            <span class="smaller-text">
              {{ formatFullDateTime(timer.start) }}
            </span>
            <div class="splitleftandright">
              <span>
                <div class="timestamp-title">
                  {{ timer.title }}
                </div>
              </span>
              <span>
                <a
                  href="#"
                  class="subtle-link"
                  @click.prevent="stopTimer(timer.rowid)"
                >
                  Stop timer
                </a>
              </span>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div class="half half-right">
        <div class="card">
          <h2>Latest Reports</h2>
          <hr />
          <div
            class="reports"
            v-for="timestamp in timestamps"
            v-bind:key="timestamp.rowid"
          >
            <div v-if="timestamp.update">
              <div class="splitleftandright">
                <span></span>
                <span>
                  <a
                    href="#"
                    class="subtle-link"
                    @click.prevent="deleteTimestamp(timestamp.rowid)"
                    >Delete</a
                  ><br />
                </span>
              </div>
              Start:
              <input
                class="input-type input-text"
                type="datetime"
                v-model="timestamp.start"
              /><br />
              Stop:
              <input
                class="input-type input-text"
                type="datetime"
                v-model="timestamp.stop"
              />
            </div>
            <div class="splitleftandright" v-else>
              <span class="smaller-text">
                {{ formatFullDateTime(timestamp.start) }} ->
                {{ formatFullDateTime(timestamp.stop) }}
              </span>
              <span class="smaller-text"> {{ getHourDiff(timestamp) }} H </span>
            </div>
            <div v-if="timestamp.update">
              Title:
              <input
                class="input-type input-text"
                type="text"
                v-model="timestamp.title"
              /><br />
              <div class="splitleftandright">
                <span></span>
                <span>
                  <a
                    href="#"
                    class="subtle-link link-besides-right"
                    @click.prevent="timestamp.update = false"
                    >Cancel</a
                  >
                  <input
                    type="button"
                    class="input-type input-button"
                    value="SAVE"
                    @click.prevent="updateTimestamp(timestamp)"
                  />
                </span>
              </div>
            </div>
            <div class="splitleftandright" v-else>
              <div class="timestamp-title">
                {{ timestamp.title }}
              </div>
              <span>
                <!-- TODO: Rewrite update form to use a date-picker and a time picker -->
                <a
                  href="#"
                  class="subtle-link"
                  @click.prevent="timestamp.update = true"
                  v-if="timestamp.update == false"
                >
                  Update
                </a>
              </span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div class="notify-wrap">
      <div class="notify error" v-if="error != ''">{{ error }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      summary: undefined,
      timers: [],
      timestamps: [],
      displayNewTimer: false,
      newTimerTitle: "",
      error: ""
    };
  },
  methods: {
    formatToTwoDigits(number) {
      if (number < 10) {
        number = "0" + number;
      }
      return number;
    },
    formatFullDateTime(datetimeObject) {
      let time = new Date(datetimeObject);
      return (
        time.getFullYear() +
        "-" +
        this.formatToTwoDigits(time.getMonth()) +
        "-" +
        this.formatToTwoDigits(time.getDate()) +
        " " +
        this.formatToTwoDigits(time.getHours()) +
        ":" +
        this.formatToTwoDigits(time.getMinutes())
      );
    },
    getHourDiff(timestamp) {
      let startDate = new Date(timestamp.start);
      let stopDate = new Date(timestamp.stop);
      /* TODO: Better rounding than using number to fixed */
      return Number((stopDate - startDate) / 3600000).toFixed(2);
    },
    getSummary() {
      fetch(this.$store.state.server + "/summary", {
        headers: {
          Authorization: this.$store.state.token
        },
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.summary = data;
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    },
    getData() {
      fetch(this.$store.state.server + "/data", {
        headers: {
          Authorization: this.$store.state.token
        },
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.timestamps = [];
            this.timers = [];
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].stop != null) {
                data.data[i].update = false;
                this.timestamps.push(data.data[i]);
              } else {
                this.timers.push(data.data[i]);
              }
            }
            this.timestamps = this.timestamps.reverse();
            this.timers = this.timers.reverse();
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    },
    startNewTimer() {
      if (this.newTimerTitle == "") {
        return false;
      }
      fetch(this.$store.state.server + "/start", {
        headers: {
          Authorization: this.$store.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.newTimerTitle
        }),
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.getData();
            this.newTimerTitle = "";
            this.displayNewTimer = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    },
    stopTimer(timerId) {
      fetch(this.$store.state.server + "/stop", {
        headers: {
          Authorization: this.$store.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: timerId
        }),
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.getData();
            this.getSummary();
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    },
    updateTimestamp(timestamp) {
      fetch(this.$store.state.server + "/update", {
        headers: {
          Authorization: this.$store.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: timestamp.rowid,
          title: timestamp.title,
          start: timestamp.start,
          stop: timestamp.stop
        }),
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.getData();
            this.getSummary();
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    },
    deleteTimestamp(id) {
      fetch(this.$store.state.server + "/delete", {
        headers: {
          Authorization: this.$store.state.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        }),
        method: "POST"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.status == "error") {
            //Throw error
            this.error = data.msg;
          } else {
            this.getData();
            this.getSummary();
          }
        })
        .catch(err => {
          console.log(err);
          this.error = err.message;
        });
    }
  },
  beforeMount() {
    if (this.$store.state.token == undefined) {
      this.$router.push("login");
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getSummary();
      this.getData();
    });
  }
};
</script>

<style>
.dismiss-new-timer {
  margin-left: 1rem;
  text-decoration: none;
  color: #000;
}

.new-timer-text {
  margin-right: 1rem;
}

.reports {
  padding: 0.5rem 0;
  text-align: left;
}

.timestamp-title {
  font-size: 1.2rem;
  padding: 0.5rem 0;
  font-weight: 400;
}
.link-besides-right {
  margin-right: 1rem;
}

.hour-report {
  display: flex;
  justify-content: center;
  padding: 0.25rem;
}

.hour-report-title {
  flex: 1;
  text-align: right;
  padding-right: 0.25rem;
  font-weight: 500;
}
.hour-report-time {
  flex: 1;
  text-align: left;
  padding-left: 0.25rem;
}
</style>
