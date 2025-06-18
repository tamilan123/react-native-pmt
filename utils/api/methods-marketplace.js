import baseAxios from "./axios-utils-marketplace";

// USER AUTH
export const signInApi = (props) =>
  baseAxios.post("/users/sign_in", { user: { ...props }, source: "mobile" });

export const registerApi = (props) =>
  baseAxios.post("/users", { user: { ...props } });

export const signOutApi = () => baseAxios.delete("/users/sign_out");

export const userApi = (token) =>
  baseAxios.get("/users/me", { headers: { Authorization: token } });

export const SendEmailOtp = (props) =>
  baseAxios.post("/send_email_otp", { ...props, source: "mobile" });

export const LoginWithOtp = (props) =>
  baseAxios.post("/login_with_otp", { ...props, source: "mobile" });

// COLLECTIONS
export const updateCollectionBuy = ({
  collectionId,
  quantity,
  transactionHash
}) =>
  baseAxios.post(`/collections/${collectionId}/buy`, {
    quantity,
    transaction_hash: transactionHash
  });

export const SendResaleFiles = (formData, slug) =>
  baseAxios.post(`/collections/${slug}/resale`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const signSellOrderApi = ({
  slug,
  instant_sale_price,
  sign_instant_sale_price,
  nonce
}) =>
  baseAxios.post(`/collections/${slug}/put_on_sale`, {
    instant_sale_price,
    sign_instant_sale_price,
    nonce
  });

export const ItemDetailsApi = ({ slug }) =>
  baseAxios.get(`/collections/${slug}`);

// NFT & PRODUCTS
export const NFTCollectionsList = async () => {
  return await baseAxios.get(`/collections/nft_lists`);
};

export const NFTCollectionsFilterList = (query) =>
  baseAxios.get(`/collections/nft_lists?${query}`);

export const NFTProductsList = () => baseAxios.get(`/products/nft_lists`);

// SETTINGS
export const SettingsApi = () => baseAxios.get("/settings");

export const NFTRelatedCollectionsList = (slug) =>
  baseAxios.get(`/collections/${slug}/related_products`);

// DAO
export const DaoViewListApi = (status) =>
  baseAxios.get(`/questions?type=${status}`);

export const DaoVoteSubmitApi = (data) =>
  baseAxios.post("/question_option_users", data);

// STAKING
export const NftListForStakingApi = ({ method, address }) =>
  baseAxios.get(`collections/nft_lists?stake=${method}&address=${address}`);

export const TokenSwapApi = (data) =>
  baseAxios.post(`/collections/token_swap`, data);

export const NftStakingApi = ({ method, collectionId, hash }) =>
  baseAxios.post(
    `collections/${collectionId}/${method}?transaction_hash=${hash}`
  );

export const PmtStakingListApi = () =>
  baseAxios.get(`collections/token_stake_plans`);

export const PmtTokenStaking = ({ data, method }) =>
  baseAxios.post(`collections/${method}`, data);

// NOTIFICATIONS
export const NotificationApi = () => baseAxios.get(`/notifications`);

export const OrderTrackDetails = (slug) =>
  baseAxios.get(`/collections/${slug}/shipment_details`);
