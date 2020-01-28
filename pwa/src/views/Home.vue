<template>
  <div></div>
</template>

<script>
export default {
  beforeMount() {
    if (this.$store.state.token === undefined) {
      this.$router.push("login");
    } else {
      this.$router.push("dashboard");
    }
  }
};
</script>
