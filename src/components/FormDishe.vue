<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} {{ id }}Plat</div>
    </q-card-section>


    <q-card-section>
      <div class="row q-mb-md">
        <q-input filled v-model="dishe.name" label="Nom (Burger)" class="col" />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.description"
          label="Description"
          type="textarea"
          class="col"
        />
      </div>

      <div class="row q-mb-md">
        <q-input
          filled
          v-model="dishe.image"
          label="URL de l'image"
          class="col"
        />
        <q-img
          :src="dishe.image ? dishe.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain
        />
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <q-rating v-model="dishe.note" size="2em" color="orange" />
        </div>
      </div>
      <p v-if="errors.length">
        <b>Erreur:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" color="grey" v-close-popup />
      <q-btn label="Sauver" color="primary" @click="checkForm"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["action", "id"],
  data() {
    return {
      errors: [],
      dishe: {
        name: "",
        description: "",
        note: 1,
        image: ""
      }
    };
  },
  methods:{
    checkForm: function (e) {
      this.errors = [];
      if (!this.dishe.name)
        this.errors.push('Merci d\'indiquer un nom de plat.');
      if (this.dishe.name.length >= 20)
        this.errors.push('Le nom du plat doit contenir 20 caractères maximum');
      if (this.dishe.description.length >= 135)
        this.errors.push('La description doit contenir 135 caractères maximum');
      if(this.errors.length == 0){
        let dishAction = this.action == "modifier" ? "modifyDish" : "addDish";
        this.$store.dispatch('tasks/'+dishAction, {dishe : this.dishe, id : this.id});
        // TODO : trigger v-close-popup here
        //this.$q.dialog({}).hide()
        this.$parent.showFormDishe = false;
      }
    }
  }
};
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
