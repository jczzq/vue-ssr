<template>
  <div class="error-page">
    <div>
      <h1 class="error-code">\{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">\{{ error.message }}</h2>
      </div>
      <p v-if="error.statusCode === 404">
        <a class="error-link" href="/">返回首页</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nuxt-error',
  props: ['error'],
  head() {
    return {
      title: this.error.message || 'An error occured'
    };
  }
};
</script>

<style scoped>
.error-page {
  color: #000;
  background: #fff;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  text-align: center;
  padding-top: 20%;
}

.error-code {
  display: inline-block;
  font-size: 2.4rem;
  font-weight: 500;
  vertical-align: top;
  border-right: 0.1rem solid rgba(0, 0, 0, 0.298039);
  margin: 0 2rem 0 0;
  padding: 1rem 2.3rem;
}

.error-wrapper-message {
  display: inline-block;
  text-align: left;
  line-height: 5rem;
  height: 5rem;
  vertical-align: middle;
}

.error-message {
  font-size: 1.4rem;
  font-weight: normal;
  margin: 0;
  padding: 0;
}

.error-link {
  color: #00bcd4;
  font-weight: normal;
  text-decoration: none;
  font-size: 1.4rem;
}
</style>
