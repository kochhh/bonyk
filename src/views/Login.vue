<template>
  <div class="max-w-xs mx-auto">
    <h1 class="mb-6 text-center">Авторизация</h1>
    <form @submit.prevent="submitHandler" novalidate>
      <div class="mb-4">
        <label
          for="email"
          class="sr-only"
        >E-mail</label>
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="E-mail"
          v-model.trim="email"
          :class="{ 'border-red-500 dark:border-red-500': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле e-mail не должно быть пустым</div>
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.email.$dirty && !$v.email.email"
        >Введите корректный e-mail</div>
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="sr-only"
        >Пароль</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Пароль"
          v-model.trim="password"
          :class="{ 'border-red-500 dark:border-red-500': $v.password.$dirty && !$v.password.required }"
        >
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-green"
        >Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  metaInfo() {
    return {
      title: this.$title('Авторизация')
    }
  },
  data: () => ({
    loading: true,
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch(e) {}
    }
  },
  mounted() {
    this.loading = false
  }
}
</script>
