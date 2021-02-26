import { createStore, createLogger } from 'vuex'

// mutations
export const INCREMENT_BY_ACTIVE_STEP = 'increment_by_active_step'
export const INCREMENT_BY_PASSIVE_STEP = 'increment_by_passive_step'
export const UPGRADE_CPU = 'upgrade_cpu'
export const UPGRADE_GPU = 'upgrade_gpu'
export const APPLY_COST = 'apply_cost'

// actions
export const BUY_UPGRADE = 'buy_upgrade'
export const START_COUNTER = 'start_counter'
export const STOP_COUNTER = 'stop_counter'

let counterInterval;

const store = createStore({
  state: () => ({
    count: 0,
    activeStep: 1, // per click
    passiveStep: 1, // per second
    upgrades: ['cpu', 'gpu'],
    upgradeNames: {
      cpu: 'buy cpu',
      gpu: 'buy gpu'
    },
    upgradeMutations: {
      cpu: UPGRADE_CPU,
      gpu: UPGRADE_GPU,
    },
    upgradeCosts: {
      cpu: 10,
      gpu: 100,
    },
  }),

  getters: {
    canUpgrade: state => upgrade => state.count >= state.upgradeCosts[upgrade],
    getUpgradeCost: state => upgrade => state.upgradeCosts[upgrade],
    getUpgradeName: state => upgrade => state.upgradeNames[upgrade],
    getUpgradeMutation: state => upgrade => state.upgradeMutations[upgrade],
  },

  mutations: {
    [INCREMENT_BY_ACTIVE_STEP](state) {
      state.count += state.activeStep
    },

    [INCREMENT_BY_PASSIVE_STEP](state) {
      state.count += state.passiveStep
    },

    [UPGRADE_CPU](state) {
      state.passiveStep += 1
    },

    [UPGRADE_GPU](state) {
      state.passiveStep += 2
    },

    [APPLY_COST](state, upgrade) {
      state.count -= state.upgradeCosts[upgrade]
    },
  },

  actions: {
    [BUY_UPGRADE]({ commit, getters }, upgrade) {
      commit(getters.getUpgradeMutation(upgrade))
      commit(APPLY_COST, upgrade)
    },

    [START_COUNTER]({ commit }) {
      counterInterval = setInterval(() => {
        commit(INCREMENT_BY_PASSIVE_STEP);
      }, 1000)
    },

    [STOP_COUNTER]() {
      clearInterval(counterInterval)
    }
  },

  plugins: [createLogger()]
})

export default store;