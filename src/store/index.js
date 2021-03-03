import { createStore, createLogger } from 'vuex'

// mutations
export const INCREMENT_BY_ACTIVE_STEP = 'increment_by_active_step'
export const INCREMENT_BY_PASSIVE_STEP = 'increment_by_passive_step'
export const UPGRADE_CPU = 'upgrade_cpu'
export const UPGRADE_GPU = 'upgrade_gpu'
export const APPLY_COST = 'apply_cost'
export const SHOW_TOAST = 'show_toast'
export const HIDE_TOAST = 'hide_toast'
export const SHOW_TOOLTIP = 'show_tooltip'
export const HIDE_TOOLTIP = 'hide_tooltip'
export const SET_TOOLTIP_COORDS = 'set_tooltip_coords'
export const ADD_TO_INVENTORY = 'add_to_inventory'
export const REMOVE_FROM_INVENTORY = 'remove_from_inventory'

// actions
export const BUY_UPGRADE = 'buy_upgrade'
export const START_COUNTER = 'start_counter'
export const STOP_COUNTER = 'stop_counter'
export const TEMPORARILY_SHOW_TOAST = 'temporarily_show_toast'

let counterInterval;
let toastId = 0;

const store = createStore({
  state: () => ({
    count: 0,
    activeStep: 1, // per click
    passiveStep: 1, // per second
    upgrades: ['cpu', 'gpu'],
    upgradeInventory: {
      cpu: 0,
      gpu: 0,
    },
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
    toasts: [],
    tooltip: {
      x: 0,
      y: 0,
      showing: false,
    }
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

    [APPLY_COST](state, { upgrade }) {
      state.count -= state.upgradeCosts[upgrade]
    },

    [SHOW_TOAST](state, { text, id }) {
      state.toasts = [{ id, text }, ...state.toasts]
    },

    [HIDE_TOAST](state, { id }) {
      state.toasts = state.toasts.filter(({ id: toastId }) => toastId !== id)
    },

    [SHOW_TOOLTIP](state) {
      state.tooltip.showing = true;
    },

    [HIDE_TOOLTIP](state) {
      state.tooltip.showing = false;
    },

    [SET_TOOLTIP_COORDS](state, { x, y }) {
      state.tooltip.x = x
      state.tooltip.y = y
    },

    [ADD_TO_INVENTORY](state, { upgrade }) {
      state.upgradeInventory[upgrade] += 1
    },

    [REMOVE_FROM_INVENTORY](state, { upgrade }) {
      state.upgradeInventory[upgrade] -= 1
    },
  },

  actions: {
    [BUY_UPGRADE]({ commit, getters }, { upgrade }) {
      commit(getters.getUpgradeMutation(upgrade))
      commit(APPLY_COST, { upgrade })
      commit(ADD_TO_INVENTORY, { upgrade })
    },

    [START_COUNTER]({ commit }) {
      counterInterval = setInterval(() => {
        commit(INCREMENT_BY_PASSIVE_STEP);
      }, 1000)
    },

    [STOP_COUNTER]() {
      clearInterval(counterInterval)
    },

    [TEMPORARILY_SHOW_TOAST]({ commit }, { text, timeout = 10000 }) {
      const id = toastId++
      commit(SHOW_TOAST, { text, id })
      setTimeout(() => {
        commit(HIDE_TOAST, { id })
      }, timeout)
    },
  },

  plugins: [createLogger({
    filter(mutation) {
      return mutation.type !== INCREMENT_BY_PASSIVE_STEP
    },
  })]
})

export default store;