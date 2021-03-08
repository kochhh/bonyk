<template>
  <div class="w-80 mx-auto">
    <h1 class="mb-6 text-center">Регистрация</h1>
    <form @submit.prevent="submitHandler" novalidate>
      <div class="mb-4">
        <label
          for="firstName"
          class="sr-only"
        >Имя</label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          placeholder="Имя"
          v-model.trim="name"
          :class="{ 'border-red-500': $v.name.$dirty && !$v.name.required }"
        >
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите ваше имя</div>
      </div>
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
          :class="{ 'border-red-500': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
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
          :class="{ 'border-red-500': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
        >
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</div>
        <div
          class="mt-2 text-red-500 text-xs"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов</div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-green"
        >Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  metaInfo() {
    return {
      title: this.$title('Регистрация')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          name: this.name
        })
        this.$router.push('/')
      } catch(e) {}
    }
  }
}
</script>
