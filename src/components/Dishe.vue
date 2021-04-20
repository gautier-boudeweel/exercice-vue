<template>
  <q-card class="card">
    <q-img :src="getImage" basic contain>
      <div class="absolute-bottom text-h6">
        {{ dishe.name }}
      </div>
    </q-img>

    <q-card-section>
      <q-rating
        :value="dishe.note"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section v-if="dishe.description.length > 0" >
      {{ dishe.description }}
    </q-card-section>
    <q-card-section v-else >
      <i>Aucune description fournie</i>
    </q-card-section>

    <q-card-actions class="absolute-bottom" align="right">
      <q-btn @click="showFormDishe = true" icon="edit" color="blue" flat
        >Modifier</q-btn
      >
      <q-btn @click="showConfirmDelete = true" icon="delete" color="red" flat>Supprimer</q-btn>
    </q-card-actions>

    <q-dialog v-model="showFormDishe">
      <form-dishe action="modifier" :id="dishe.id"/>
    </q-dialog>

    <q-dialog v-model="showConfirmDelete">
      <q-card class="form-card">
        <q-card-section>
          <div class="text-h6 heading">Supprimer ce plat ?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Annuler" color="grey" v-close-popup />
          <q-btn label="Supprimer" color="primary" @click="deleteDish"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  props: ["dishe"],
  data() {
    return {
      showFormDishe: false,
      showConfirmDelete: false,
      deleteDish: () => this.$store.dispatch('tasks/deleteDish', this.dishe.id)
    };
  },
  components: {
    "form-dishe": require("components/FormDishe.vue").default
  },
  method: {
    // todo : use method (or computed ?) instead of data for deleteDish
    deleteDish() {
      this.$store.dispatch('tasks/deleteDish', this.dishe.id);
    }
  },
  computed: {
    getImage()  {
      return (this.dishe.image.length ? this.dishe.image : "statics/image-placeholder.png")
    }
  }
};
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd !important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
</style>
