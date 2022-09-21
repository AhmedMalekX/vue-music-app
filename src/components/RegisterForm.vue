<template>
  <div class="text-white text-center font-bold p-5 mb-4" v-if="reg_show_alert"
       :class="reg_alert_variant">
    {{ reg_alert_msg }}
  </div>
  <vee-form @submit="register" :validation-schema="schema"
            :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="name">Name</label>
      <vee-field type="text" id="name" name='name'
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                 placeholder="Enter Name"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="register-email">Email</label>
      <vee-field type="email" id="register-email" name="email"
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                 placeholder="Enter Email"/>
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="age">Age</label>
      <vee-field type="number" id="age" name="age"
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"/>
      <ErrorMessage class="text-red-600" name="age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="register-password">Password</label>
      <vee-field name='password'
                 :bails="false" v-slot="{field, errors}">
        <input class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
               v-bind="field"
               placeholder="Password" type="password" id="register-password">
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
      <ErrorMessage name="password" class="text-red-600"/>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="confirm-password">Confirm Password</label>
      <vee-field type="password" id="confirm-password" name="confirm_password"
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                 placeholder="Confirm Password"/>
      <ErrorMessage name="confirm_password" class="text-red-600"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="country">Country</label>
      <vee-field as="select"
                 id="country"
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                 name="country"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage name="country" class="text-red-600"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field name="tos" value="1" type="checkbox" id="terms"
                 class="w-4 h-4 float-left -ml-6 mt-1 rounded"/>
      <label class="inline-block" for="terms">Accept terms of service</label>
      <br>
      <ErrorMessage name="tos" class="text-red-600"/>
    </div>
    <button type="submit" :disabled="reg_in_submission"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:25|alpha_spaces',
        email: 'required|min:3|max:50|email',
        age: 'required|min_value:13|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'password_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_show_alert: false,
      reg_in_submission: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occurred. Please try again later.';

        return;
      }
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account is being created.';
      window.location.reload();
    },
  },
};

</script>
