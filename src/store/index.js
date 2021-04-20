import Vue from "vue";
import Vuex from "vuex";

// Importer votre module ici et l'ajouter au Store (ligne 19)

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks : {
        namespaced: true,
        state: { dishes :
          [
            {
              id: 1,
              image: "https://i.imgur.com/0umadnY.jpg",
              name: "Burger",
              description:
                  "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
              note: 4
            },
            {
              id: 2,
              image: "https://i.imgur.com/b9zDbyb.jpg",
              name: "Pizza",
              description:
                  "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
              note: 5
            },
            {
              id: 3,
              image: "https://i.imgur.com/RbKjUjB.jpg",
              name: "Petits choux",
              description:
                  "Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...",
              note: 1
            },
            {
              id: 4,
              image: "https://i.imgur.com/xAuhNVg.jpg",
              name: "BBQ Ribs",
              description:
                  "Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.",
              note: 5
            }
          ],
          last_insert_id : 4
        }, // module state is already nested and not affected by namespace option
        getters: {
          dishes : (state/*, getters, rootState, rootGetters*/) => {
           return state.dishes;
          }
        },
        actions: {
          deleteDish : (store, id) => store.commit('deleteDish', id),
          addDish : (store, data) => {
            store.commit('addDish', data)
          },
          modifyDish : (store, data) => store.commit('modifyDish', data)
        },
        mutations: {
          initialiseStore(state) {
            if(localStorage.getItem('store')) {
              this.replaceState(
                  Object.assign(state, JSON.parse(localStorage.getItem('store')))
              );
            }
          },
          deleteDish : (state, id) => {
            Vue.delete(state.dishes, state.dishes.indexOf(state.dishes.filter(el => el.id == id)[0]));
          },
          addDish : (state, data) => {
            state.last_insert_id = state.last_insert_id + 1;
            state.dishes.push({ ...data.dishe, id: state.last_insert_id })
          },
          modifyDish : (state, {dishe, id}) => {
            let currentDish = state.dishes.filter(el => el.id == id)[0];
            let index = state.dishes.indexOf(currentDish);

            Vue.set(state.dishes, index, {...currentDish, ...dishe});
          }
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  Store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
  });
  return Store;
}
