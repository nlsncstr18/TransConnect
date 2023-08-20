// reducer.js

import {
  INCREMENT_PASSENGERS,
  DECREMENT_PASSENGERS,
  INCREMENT_PAID,
  DECREMENT_PAID,
  INCREMENT_UNPAID,
  DECREMENT_UNPAID,
  INCREMENT_INBOUND_MOA,
  DECREMENT_INBOUND_MOA,
  INCREMENT_OUTBOUND_MOA,
  DECREMENT_OUTBOUND_MOA,
  INCREMENT_INBOUND_MACAPAGAL,
  DECREMENT_INBOUND_MACAPAGAL,
  INCREMENT_OUTBOUND_MACAPAGAL,
  DECREMENT_OUTBOUND_MACAPAGAL,
  INCREMENT_INBOUND_TAFT,
  DECREMENT_INBOUND_TAFT,
  INCREMENT_OUTBOUND_TAFT,
  DECREMENT_OUTBOUND_TAFT,
  INCREMENT_INBOUND_TRAMO,
  DECREMENT_INBOUND_TRAMO,
  INCREMENT_OUTBOUND_TRAMO,
  DECREMENT_OUTBOUND_TRAMO,
  INCREMENT_INBOUND_AYALA,
  DECREMENT_INBOUND_AYALA,
  INCREMENT_OUTBOUND_AYALA,
  DECREMENT_OUTBOUND_AYALA,
  INCREMENT_INBOUND_BUENDIA,
  DECREMENT_INBOUND_BUENDIA,
  INCREMENT_OUTBOUND_BUENDIA,
  DECREMENT_OUTBOUND_BUENDIA,
  INCREMENT_INBOUND_GUADALUPE,
  DECREMENT_INBOUND_GUADALUPE,
  INCREMENT_OUTBOUND_GUADALUPE,
  DECREMENT_OUTBOUND_GUADALUPE,
  INCREMENT_INBOUND_ORTIGAS,
  DECREMENT_INBOUND_ORTIGAS,
  INCREMENT_OUTBOUND_ORTIGAS,
  DECREMENT_OUTBOUND_ORTIGAS,
  INCREMENT_INBOUND_SANTOLAN,
  DECREMENT_INBOUND_SANTOLAN,
  INCREMENT_OUTBOUND_SANTOLAN,
  DECREMENT_OUTBOUND_SANTOLAN,
  INCREMENT_INBOUND_MAINAVE,
  DECREMENT_INBOUND_MAINAVE,
  INCREMENT_OUTBOUND_MAINAVE,
  DECREMENT_OUTBOUND_MAINAVE,
  INCREMENT_INBOUND_NEPAC,
  DECREMENT_INBOUND_NEPAC,
  INCREMENT_OUTBOUND_NEPAC,
  DECREMENT_OUTBOUND_NEPAC,
  INCREMENT_INBOUND_QUEZON,
  DECREMENT_INBOUND_QUEZON,
  INCREMENT_OUTBOUND_QUEZON,
  DECREMENT_OUTBOUND_QUEZON,
  INCREMENT_INBOUND_NORTHAVE,
  DECREMENT_INBOUND_NORTHAVE,
  INCREMENT_OUTBOUND_NORTHAVE,
  DECREMENT_OUTBOUND_NORTHAVE,
  INCREMENT_INBOUND_ROOSEVELT,
  DECREMENT_INBOUND_ROOSEVELT,
  INCREMENT_OUTBOUND_ROOSEVELT,
  DECREMENT_OUTBOUND_ROOSEVELT,
  INCREMENT_INBOUND_KAINGIN,
  DECREMENT_INBOUND_KAINGIN,
  INCREMENT_OUTBOUND_KAINGIN,
  DECREMENT_OUTBOUND_KAINGIN,
  INCREMENT_INBOUND_BALINTAWAK,
  DECREMENT_INBOUND_BALINTAWAK,
  INCREMENT_OUTBOUND_BALINTAWAK,
  DECREMENT_OUTBOUND_BALINTAWAK,
  INCREMENT_INBOUND_BBAR,
  DECREMENT_INBOUND_BBAR,
  INCREMENT_OUTBOUND_BBAR,
  DECREMENT_OUTBOUND_BBAR,
  INCREMENT_INBOUND_MONU,
  DECREMENT_INBOUND_MONU,
  INCREMENT_OUTBOUND_MONU,
  DECREMENT_OUTBOUND_MONU,
  SET_CONFIRMATION_SUBMIT,


} from "./actions";

const initialState = {
  set_confirmation: false,
  set_confirmation_submit: false,


  passengers: 0,
  paid: 0,
  unpaid: 0,
  tPassengers: 0,
  inbound_passengers_moa: 0,
  outbound_passengers_moa: 0,
  inbound_passengers_macapagal: 0,
  outbound_passengers_macapagal: 0,
  inbound_passengers_taft: 0,
  outbound_passengers_taft: 0,
  inbound_passengers_tramo: 0,
  outbound_passengers_tramo: 0,
  inbound_passengers_ayala: 5,
  outbound_passengers_ayala: 0,
  inbound_passengers_buendia: 0,
  outbound_passengers_buendia: 0,
  inbound_passengers_guadalupe: 0,
  outbound_passengers_guadalupe: 0,
  inbound_passengers_ortigas: 0,
  outbound_passengers_ortigas: 0,
  inbound_passengers_santolan: 0,
  outbound_passengers_santolan: 0,
  inbound_passengers_mainavenue: 0,
  outbound_passengers_mainavenue: 0,
  inbound_passengers_nepaque: 0,
  outbound_passengers_nepaque: 0,
  inbound_passengers_quezon: 0,
  outbound_passengers_quezon: 0,
  inbound_passengers_northavenue: 0,
  outbound_passengers_northavenue: 0,
  inbound_passengers_roosevelt: 0,
  outbound_passengers_roosevelt: 0,
  inbound_passengers_kaingin: 0,
  outbound_passengers_kaingin: 0,
  inbound_passengers_balintawak: 0,
  outbound_passengers_balintawak: 0,
  inbound_passengers_bagongbarrio: 0,
  outbound_passengers_bagongbarrio: 0,
  inbound_passengers_monumento: 0,
  outbound_passengers_monumento: 0,
};


// Load state from local storage
const savedState = localStorage.getItem("state");
const initialStateWithSavedState = savedState
  ? JSON.parse(savedState)
  : initialState;

const reducer = (state = initialStateWithSavedState, action) => {
  let newState;
  switch (action.type) {

    case "SUBTRACT_PASSENGERS":
      return {
        ...state,
        tPassengers: state.tPassengers > 0 ? state.tPassengers - action.payload : 0,
      }


    case "SET_CONFIRMATION_TRUE":
      return {
        ...state,
        set_confirmation: true,
      };
    case "SET_CONFIRMATION_FALSE":
      return {
        ...state,
        set_confirmation: false,
      };
    case SET_CONFIRMATION_SUBMIT:
      return {
        ...state,
        set_confirmation_submit: action.payload,
      };
    case "CLEAR_VALUES_MONUMENTO":
      return {
        ...state,
        outbound_passengers_monumento: 0,
      };
    case "CLEAR_VALUES_BBAR":
      return {
        ...state,
        outbound_passengers_bagongbarrio: 0,
      };
    case "CLEAR_VALUES_BALINTAWAK":
      return {
        ...state,
        outbound_passengers_balintawak: 0,
      };
    case "CLEAR_VALUES_KAINGIN":
      return {
        ...state,
        outbound_passengers_kaingin: 0,
      };
    case "CLEAR_VALUES_ROOSEVELT":
      return {
        ...state,
        outbound_passengers_roosevelt: 0,
      };
    case "CLEAR_VALUES_NORTHAVE":
      return {
        ...state,
        outbound_passengers_northavenue: 0,
      };
    case "CLEAR_VALUES_QUEZON":
      return {
        ...state,
        outbound_passengers_quezon: 0,
      };
    case "CLEAR_VALUES_NEPAC":
      return {
        ...state,
        outbound_passengers_nepaque: 0,
      };
    case "CLEAR_VALUES_MAINAVE":
      return {
        ...state,
        outbound_passengers_mainavenue: 0,
      };
    case "CLEAR_VALUES_SANTOLAN":
      return {
        ...state,
        outbound_passengers_santolan: 0,
      };
    case "CLEAR_VALUES_ORTIGAS":
      return {
        ...state,
        outbound_passengers_ortigas: 0,
      };
    case "CLEAR_VALUES_GUADALUPE":
      return {
        ...state,
        outbound_passengers_guadalupe: 0,
      };
    case "CLEAR_VALUES_BUENDIA":
      return {
        ...state,
        outbound_passengers_buendia: 0,
      };
    case "CLEAR_VALUES_AYALA":
      return {
        ...state,
        outbound_passengers_ayala: 0,
      };
    case "CLEAR_VALUES_TRAMO":
      return {
        ...state,
        outbound_passengers_tramo: 0,
      };
    case "CLEAR_VALUES_TAFT":
      return {
        ...state,
        outbound_passengers_taft: 0,
      };
    case "CLEAR_VALUES_MACAPAGAL":
      return {
        ...state,
        outbound_passengers_macapagal: 0,
      };
    case "CLEAR_VALUES_MOA":
      return {
        ...state,
        outbound_passengers_moa: 0,
      };
    case "CLEAR_PASSENGERS":
      return {
        ...state,
        passengers: 0,
      };




    case INCREMENT_PASSENGERS:
      newState = {
        ...state,
        passengers: state.passengers + 1,
        tPassengers: state.tPassengers + 1,
      };
      break;
    case DECREMENT_PASSENGERS:
      newState = {
        ...state,
        passengers: state.passengers > 0 ? state.passengers - 1 : 0,
        tPassengers: state.tpassengers - 1,
      };
      break;
    case INCREMENT_PAID:

      newState = {
        ...state,
        paid: state.paid + 1,
      };

      break;
    case DECREMENT_PAID:
      newState = {
        ...state,
        paid: state.paid > 0 ? state.paid - 1 : 0,
      };
      break;
    case INCREMENT_UNPAID:
      newState = {
        ...state,
        unpaid: state.unpaid + 1,
      };
      break;
    case DECREMENT_UNPAID:
      newState = {
        ...state,
        unpaid: state.unpaid > 0 ? state.unpaid - 1 : 0,
      };
      break;
    case INCREMENT_INBOUND_MOA:
      newState = {
        ...state,
        inbound_passengers_moa: state.inbound_passengers_moa + 1,
      };
      break;
    case DECREMENT_INBOUND_MOA:
      newState = {
        ...state,
        inbound_passengers_moa:
          state.inbound_passengers_moa > 0
            ? state.inbound_passengers_moa - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_MOA:
      newState = {
        ...state,
        outbound_passengers_moa: state.outbound_passengers_moa + 1,
      };
      break;
    case DECREMENT_OUTBOUND_MOA:
      newState = {
        ...state,
        outbound_passengers_moa:
          state.outbound_passengers_moa > 0
            ? state.outbound_passengers_moa - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_MACAPAGAL:
      newState = {
        ...state,
        inbound_passengers_macapagal: state.inbound_passengers_macapagal + 1,
      };
      break;
    case DECREMENT_INBOUND_MACAPAGAL:
      newState = {
        ...state,
        inbound_passengers_macapagal:
          state.inbound_passengers_macapagal > 0
            ? state.inbound_passengers_macapagal - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_MACAPAGAL:
      newState = {
        ...state,
        outbound_passengers_macapagal: state.outbound_passengers_macapagal + 1,
      };
      break;
    case DECREMENT_OUTBOUND_MACAPAGAL:
      newState = {
        ...state,
        outbound_passengers_macapagal:
          state.outbound_passengers_macapagal > 0
            ? state.outbound_passengers_macapagal - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_TAFT:
      newState = {
        ...state,
        inbound_passengers_taft: state.inbound_passengers_taft + 1,
      };
      break;
    case DECREMENT_INBOUND_TAFT:
      newState = {
        ...state,
        inbound_passengers_taft:
          state.inbound_passengers_taft > 0
            ? state.inbound_passengers_taft - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_TAFT:
      newState = {
        ...state,
        outbound_passengers_taft: state.outbound_passengers_taft + 1,
      };
      break;
    case DECREMENT_OUTBOUND_TAFT:
      newState = {
        ...state,
        outbound_passengers_taft:
          state.outbound_passengers_taft > 0
            ? state.outbound_passengers_taft - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_TRAMO:
      newState = {
        ...state,
        inbound_passengers_tramo: state.inbound_passengers_tramo + 1,
      };
      break;
    case DECREMENT_INBOUND_TRAMO:
      newState = {
        ...state,
        inbound_passengers_tramo:
          state.inbound_passengers_tramo > 0
            ? state.inbound_passengers_tramo - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_TRAMO:
      newState = {
        ...state,
        outbound_passengers_tramo: state.outbound_passengers_tramo + 1,
      };
      break;
    case DECREMENT_OUTBOUND_TRAMO:
      newState = {
        ...state,
        outbound_passengers_tramo:
          state.outbound_passengers_tramo > 0
            ? state.outbound_passengers_tramo - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_AYALA:
      newState = {
        ...state,
        inbound_passengers_ayala: state.inbound_passengers_ayala + 1,
      };
      break;
    case DECREMENT_INBOUND_AYALA:
      newState = {
        ...state,
        inbound_passengers_ayala:
          state.inbound_passengers_ayala > 0
            ? state.inbound_passengers_ayala - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_AYALA:
      newState = {
        ...state,
        outbound_passengers_ayala: state.outbound_passengers_ayala + 1,
      };
      break;
    case DECREMENT_OUTBOUND_AYALA:
      newState = {
        ...state,
        outbound_passengers_ayala:
          state.outbound_passengers_ayala > 0
            ? state.outbound_passengers_ayala - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_BUENDIA:
      newState = {
        ...state,
        inbound_passengers_buendia: state.inbound_passengers_buendia + 1,
      };
      break;
    case DECREMENT_INBOUND_BUENDIA:
      newState = {
        ...state,
        inbound_passengers_buendia:
          state.inbound_passengers_buendia > 0
            ? state.inbound_passengers_buendia - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_BUENDIA:
      newState = {
        ...state,
        outbound_passengers_buendia: state.outbound_passengers_buendia + 1,
      };
      break;
    case DECREMENT_OUTBOUND_BUENDIA:
      newState = {
        ...state,
        outbound_passengers_buendia:
          state.outbound_passengers_buendia > 0
            ? state.outbound_passengers_buendia - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_GUADALUPE:
      newState = {
        ...state,
        inbound_passengers_guadalupe: state.inbound_passengers_guadalupe + 1,
      };
      break;
    case DECREMENT_INBOUND_GUADALUPE:
      newState = {
        ...state,
        inbound_passengers_guadalupe:
          state.inbound_passengers_guadalupe > 0
            ? state.inbound_passengers_guadalupe - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_GUADALUPE:
      newState = {
        ...state,
        outbound_passengers_guadalupe: state.outbound_passengers_guadalupe + 1,
      };
      break;
    case DECREMENT_OUTBOUND_GUADALUPE:
      newState = {
        ...state,
        outbound_passengers_guadalupe:
          state.outbound_passengers_guadalupe > 0
            ? state.outbound_passengers_guadalupe - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_ORTIGAS:
      newState = {
        ...state,
        inbound_passengers_ortigas: state.inbound_passengers_ortigas + 1,
      };
      break;
    case DECREMENT_INBOUND_ORTIGAS:
      newState = {
        ...state,
        inbound_passengers_ortigas:
          state.inbound_passengers_ortigas > 0
            ? state.inbound_passengers_ortigas - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_ORTIGAS:
      newState = {
        ...state,
        outbound_passengers_ortigas: state.outbound_passengers_ortigas + 1,
      };
      break;
    case DECREMENT_OUTBOUND_ORTIGAS:
      newState = {
        ...state,
        outbound_passengers_ortigas:
          state.outbound_passengers_ortigas > 0
            ? state.outbound_passengers_ortigas - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_SANTOLAN:
      newState = {
        ...state,
        inbound_passengers_santolan: state.inbound_passengers_santolan + 1,
      };
      break;
    case DECREMENT_INBOUND_SANTOLAN:
      newState = {
        ...state,
        inbound_passengers_santolan:
          state.inbound_passengers_santolan > 0
            ? state.inbound_passengers_santolan - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_SANTOLAN:
      newState = {
        ...state,
        outbound_passengers_santolan: state.outbound_passengers_santolan + 1,
      };
      break;
    case DECREMENT_OUTBOUND_SANTOLAN:
      newState = {
        ...state,
        outbound_passengers_santolan:
          state.outbound_passengers_santolan > 0
            ? state.outbound_passengers_santolan - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_MAINAVE:
      newState = {
        ...state,
        inbound_passengers_mainave: state.inbound_passengers_mainavenue + 1,
      };
      break;
    case DECREMENT_INBOUND_MAINAVE:
      newState = {
        ...state,
        inbound_passengers_mainavenue:
          state.inbound_passengers_mainavenue > 0
            ? state.inbound_passengers_mainavenue - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_MAINAVE:
      newState = {
        ...state,
        outbound_passengers_mainavenue:
          state.outbound_passengers_mainavenue + 1,
      };
      break;
    case DECREMENT_OUTBOUND_MAINAVE:
      newState = {
        ...state,
        outbound_passengers_mainavenue:
          state.outbound_passengers_mainavenue > 0
            ? state.outbound_passengers_mainavenue - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_NEPAC:
      newState = {
        ...state,
        inbound_passengers_nepaque: state.inbound_passengers_nepaque + 1,
      };
      break;
    case DECREMENT_INBOUND_NEPAC:
      newState = {
        ...state,
        inbound_passengers_nepaque:
          state.inbound_passengers_nepaque > 0
            ? state.inbound_passengers_nepaque - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_NEPAC:
      newState = {
        ...state,
        outbound_passengers_nepaque: state.outbound_passengers_nepaque + 1,
      };
      break;
    case DECREMENT_OUTBOUND_NEPAC:
      newState = {
        ...state,
        outbound_passengers_nepaque:
          state.outbound_passengers_nepaque > 0
            ? state.outbound_passengers_nepaque - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_QUEZON:
      newState = {
        ...state,
        inbound_passengers_quezon: state.inbound_passengers_quezon + 1,
      };
      break;
    case DECREMENT_INBOUND_QUEZON:
      newState = {
        ...state,
        inbound_passengers_quezon:
          state.inbound_passengers_quezon > 0
            ? state.inbound_passengers_quezon - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_QUEZON:
      newState = {
        ...state,
        outbound_passengers_quezon: state.outbound_passengers_quezon + 1,
      };
      break;
    case DECREMENT_OUTBOUND_QUEZON:
      newState = {
        ...state,
        outbound_passengers_quezon:
          state.outbound_passengers_quezon > 0
            ? state.outbound_passengers_quezon - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_NORTHAVE:
      newState = {
        ...state,
        inbound_passengers_northavenue:
          state.inbound_passengers_northavenue + 1,
      };
      break;
    case DECREMENT_INBOUND_NORTHAVE:
      newState = {
        ...state,
        inbound_passengers_northavenue:
          state.inbound_passengers_northavenue > 0
            ? state.inbound_passengers_northavenue - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_NORTHAVE:
      newState = {
        ...state,
        outbound_passengers_northavenue:
          state.outbound_passengers_northavenue + 1,
      };
      break;
    case DECREMENT_OUTBOUND_NORTHAVE:
      newState = {
        ...state,
        outbound_passengers_northavenue:
          state.outbound_passengers_northavenue > 0
            ? state.outbound_passengers_northavenue - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_ROOSEVELT:
      newState = {
        ...state,
        inbound_passengers_roosevelt: state.inbound_passengers_roosevelt + 1,
      };
      break;
    case DECREMENT_INBOUND_ROOSEVELT:
      newState = {
        ...state,
        inbound_passengers_roosevelt:
          state.inbound_passengers_roosevelt > 0
            ? state.inbound_passengers_roosevelt - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_ROOSEVELT:
      newState = {
        ...state,
        outbound_passengers_roosevelt: state.outbound_passengers_roosevelt + 1,
      };
      break;
    case DECREMENT_OUTBOUND_ROOSEVELT:
      newState = {
        ...state,
        outbound_passengers_roosevelt:
          state.outbound_passengers_roosevelt > 0
            ? state.outbound_passengers_roosevelt - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_KAINGIN:
      newState = {
        ...state,
        inbound_passengers_kaingin: state.inbound_passengers_kaingin + 1,
      };
      break;
    case DECREMENT_INBOUND_KAINGIN:
      newState = {
        ...state,
        inbound_passengers_kaingin:
          state.inbound_passengers_kaingin > 0
            ? state.inbound_passengers_kaingin - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_KAINGIN:
      newState = {
        ...state,
        outbound_passengers_kaingin: state.outbound_passengers_kaingin + 1,
      };
      break;
    case DECREMENT_OUTBOUND_KAINGIN:
      newState = {
        ...state,
        outbound_passengers_kaingin:
          state.outbound_passengers_kaingin > 0
            ? state.outbound_passengers_kaingin - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_BALINTAWAK:
      newState = {
        ...state,
        inbound_passengers_balintawak: state.inbound_passengers_balintawak + 1,
      };
      break;
    case DECREMENT_INBOUND_BALINTAWAK:
      newState = {
        ...state,
        inbound_passengers_balintawak:
          state.inbound_passengers_balintawak > 0
            ? state.inbound_passengers_balintawak - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_BALINTAWAK:
      newState = {
        ...state,
        outbound_passengers_balintawak:
          state.outbound_passengers_balintawak + 1,
      };
      break;
    case DECREMENT_OUTBOUND_BALINTAWAK:
      newState = {
        ...state,
        outbound_passengers_balintawak:
          state.outbound_passengers_balintawak > 0
            ? state.outbound_passengers_balintawak - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_BBAR:
      newState = {
        ...state,
        inbound_passengers_bagongbarrio:
          state.inbound_passengers_bagongbarrio + 1,
      };
      break;
    case DECREMENT_INBOUND_BBAR:
      newState = {
        ...state,
        inbound_passengers_bagongbarrio:
          state.inbound_passengers_bagongbarrio > 0
            ? state.inbound_passengers_bagongbarrio - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_BBAR:
      newState = {
        ...state,
        outbound_passengers_bagongbarrio:
          state.outbound_passengers_bagongbarrio + 1,
      };
      break;
    case DECREMENT_OUTBOUND_BBAR:
      newState = {
        ...state,
        outbound_passengers_bagongbarrio:
          state.outbound_passengers_bagongbarrio > 0
            ? state.outbound_passengers_bagongbarrio - 1
            : 0,
      };
      break;
    case INCREMENT_INBOUND_MONU:
      newState = {
        ...state,
        inbound_passengers_monumento: state.inbound_passengers_monumento + 1,
      };
      break;
    case DECREMENT_INBOUND_MONU:
      newState = {
        ...state,
        inbound_passengers_monumento:
          state.inbound_passengers_monumento > 0
            ? state.inbound_passengers_monumento - 1
            : 0,
      };
      break;
    case INCREMENT_OUTBOUND_MONU:
      newState = {
        ...state,
        outbound_passengers_monumento: state.outbound_passengers_monumento + 1,
      };
      break;
    case DECREMENT_OUTBOUND_MONU:
      newState = {
        ...state,
        outbound_passengers_monumento:
          state.outbound_passengers_monumento > 0
            ? state.outbound_passengers_monumento - 1
            : 0,
      };
      break;

    default:
      newState = state;
  }
  return newState;

  // // Save state to local storage
  // localStorage.setItem("state", JSON.stringify(newState));


};

export default reducer;
