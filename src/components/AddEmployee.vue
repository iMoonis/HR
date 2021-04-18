<template>
  <b-jumbotron class="col-lg-7 mr-2" header="Add Employee">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="name" label="Employee Name:" label-for="name">
        <b-form-input
          id="addInput-1"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="department" label="Department:" label-for="department">
        <b-form-select
          id="addInput-2"
          v-model="form.department"
          :options="departments"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="position"
        label="Employee Position:"
        label-for="position"
      >
        <b-form-input
          id="addinput-3"
          v-model="form.position"
          placeholder="Position"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="AddInput-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.gender"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="Male">Male</b-form-checkbox>
          <b-form-checkbox value="Female">Female</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group id="age" label="Date of Birth:" label-for="age">
        <b-form-input
          id="addInput-5"
          type="date"
          v-model="form.age"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="mr-3" type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-jumbotron>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        department: null,
        position: "",
        gender: [],
        age: "",
      },
      departments: [
        { text: "Select One", value: null },
        "IT",
        "Marketing",
        "Accounting",
      ],
      show: true,
    };
  },
  methods: {
    ...mapActions(["addEmployee"]),
    onSubmit(event) {
      event.preventDefault();
      const diffTime = Math.abs(new Date() - new Date(this.form.age));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));
      const newEmployee = {
        name: this.form.name,
        department: this.form.department,
        position: this.form.position,
        gender: this.form.gender,
        age: diffDays,
        dBirth: this.form.age,
      };
      this.addEmployee(newEmployee);
      this.form.name = "";
      this.form.department = null;
      this.form.position = "";
      this.form.gender = [];
      this.form.age = "";
      // alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.department = null;
      this.form.position = "";
      this.form.gender = [];
      this.form.age = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
