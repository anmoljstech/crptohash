import { base_url } from "./Config";
import _fetch from "./Fetchfunction";
export const loginApi = (data) => {
    return _fetch(`${base_url}/admin/signIn`, 'POST', data );
  };
  export const loginotpApi = (data) => {
    return _fetch(`${base_url}/admin/verifySignIn`, 'POST', data );
  };
  export const dashboarddata = (data) => {
    return _fetch(`${base_url}/admin/dashboard`, 'POST', data );
  };

  export const userapi = (data) => {
    return _fetch(`${base_url}/admin/users`, 'POST', data );
  };
  export const userdetailsapi = (data) => {
    return _fetch(`${base_url}/admin/userDetails`, 'POST', data );
  };
  export const despositapi = (data) => {
    return _fetch(`${base_url}/admin/deposit_transactions`, 'POST', data );
  };
  export const marginapi = (data) => {
    return _fetch(`${base_url}/admin/margin_transactions`, 'POST', data );
  };
  export const payoutapi = (data) => {
    return _fetch(`${base_url}/admin/payout_transactions`, 'POST', data );
  };
  export const withdrawsapi = (data) => {
    return _fetch(`${base_url}/admin/pending_withdraws`, 'POST', data );
  };
  export const withdrawsactionapi = (data) => {
    return _fetch(`${base_url}/admin/update_withdraw_status`, 'POST', data );
  };