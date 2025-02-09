export interface IUpdateTabTitlePayload {
  id: string;
  title: string;
}

export interface IUpdateTabUrlPayload {
  id: string;
  url: string;
}

export interface IUpdateTabIconPayload {
  id: string;
  icon: string;
}

export interface IUpdateTabLoadingPayload {
  id: string;
  loading: boolean;
}
