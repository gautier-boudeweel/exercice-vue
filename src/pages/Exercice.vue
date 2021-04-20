<template>
  <q-page class="q-pa-lg">
    <vue-pull-refresh :on-refresh="onRefresh"></vue-pull-refresh>
    <div class="row q-gutter-lg">
      <dishe v-for="dishe in dishes" :key="dishe.id" :dishe="dishe" />

      <add-button @click="showFormDishe = true" />

      <q-dialog v-model="showFormDishe">
        <form-dishe action="add" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dishes: this.$store.getters['tasks/dishes'],
      showFormDishe: false
    };
  },
  components: {
    dishe: require("components/Dishe.vue").default,
    "add-button": require("components/AddButton.vue").default,
    "form-dishe": require("components/FormDishe.vue").default,
    "vue-pull-refresh": require("vue-pull-refresh")
  },
  beforeCreate() {
    this.$store.commit('tasks/initialiseStore');
  },
  methods: {
    onRefresh: function() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 1000);
      });
    }
  },
};
</script>
