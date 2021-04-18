<template>
  <div>
    <h3 class="mb-4">Dashboard</h3>
    <b-row>
      <b-col>
        <b-card
          title="Employees"
          bg-variant="dark"
          text-variant="white"
          class="text-center my-2"
        >
          <b-card-text>
            <b-col>{{ employeesCount }}</b-col>
            <b-row class="my-2">
              <b-col>Male</b-col>
              <b-col>Female</b-col>
            </b-row>
            <b-row>
              <b-col>{{ maleEmployees }}</b-col>
              <b-col>{{ femaleEmployees }}</b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          title="Avg Age"
          bg-variant="dark"
          text-variant="white"
          class="text-center my-2"
        >
          <b-card-text>
            <b-col>{{ avgAge }}</b-col>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          title="Department"
          bg-variant="dark"
          text-variant="white"
          class="text-center my-2"
        >
          <b-card-text>
            <b-col>{{ allDepartments }}</b-col>
            <b-row class="my-2">
              <b-col>IT</b-col>
              <b-col>Marketing</b-col>
              <b-col>Accounting</b-col>
            </b-row>
            <b-row>
              <b-col>{{ employeesI }}</b-col>
              <b-col>{{ employeesM }}</b-col>
              <b-col>{{ employeesA }}</b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      allDepartments: 3,
      ...mapState(["employees"]),
    };
  },
  computed: {
    ...mapGetters([
      "employeesCount",
      "maleEmployees",
      "femaleEmployees",
      "employeesA",
      "employeesM",
      "employeesI",
      "avgAge",
    ]),
  },
  mounted() {
    this.$store.dispatch("loadEmployees");
  },
};
</script>
