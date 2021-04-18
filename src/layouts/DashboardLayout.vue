<template>
  <div>
    <!-- Mobile Nav Start -->
    <b-navbar class="d-sm-none" toggleable type="dark" variant="dark">
      <b-navbar-brand>HRBoard</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/dashboard" custom v-slot="{ navigate }">
              <span
                @click="navigate"
                @keypress.enter="navigate"
                role="link"
                class="w-100 d-block py-1"
              >
                Dashboard
              </span>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/employee" custom v-slot="{ navigate }">
              <span
                @click="navigate"
                @keypress.enter="navigate"
                role="link"
                class="w-100 d-block py-1"
              >
                Employee
              </span>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Mobile Nav End -->

    <b-container fluid>
      <b-row>
        <!-- Sidebar Start -->
        <b-col class="col-sm-2 d-none d-sm-block border-right shadow">
          <b-nav tabs class="flex-md-column min-vh-100">
            <b-navbar-brand class="my-md-2 font-weight-bold">
              HRBoard
            </b-navbar-brand>
            <b-row class="flex-md-column text-center align-center">
              <b-nav-item>
                <router-link to="/dashboard" custom v-slot="{ navigate }">
                  <span
                    @click="navigate"
                    @keypress.enter="navigate"
                    role="link"
                    class="w-100 d-block py-1 text-dark"
                  >
                    <b-icon icon="grid"></b-icon>
                    Dashboard
                  </span>
                </router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link to="/employee" custom v-slot="{ navigate }">
                  <span
                    @click="navigate"
                    @keypress.enter="navigate"
                    role="link"
                    class="w-100 d-block py-1 text-dark"
                  >
                    <b-icon icon="people"></b-icon>
                    Employees
                  </span>
                </router-link>
              </b-nav-item>
            </b-row>
          </b-nav>
        </b-col>
        <!-- Sidebar End -->
        <b-col class="col-sm-10">
          <b-container fluid class="py-2">
            <router-view></router-view>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
