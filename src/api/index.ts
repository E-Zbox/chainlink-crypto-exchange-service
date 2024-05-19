// interface
import { IGlobalCryptoMetricsResponse, IRecord } from "./interface";

const { COIN_MARKETCAP_API_KEY } = process.env;

if (!COIN_MARKETCAP_API_KEY) {
  throw new Error("Configure environment with `COIN_MARKETCAP_API_KEY`");
}

const coinmarketcapBaseURL = "https://pro-api.coinmarketcap.com/v1";

const coinmarketcapHeader = {
  "X-CMC_PRO_API_KEY": COIN_MARKETCAP_API_KEY,
};

export const getGlobalCryptoMetrics =
  async (): Promise<IGlobalCryptoMetricsResponse> => {
    let response: IGlobalCryptoMetricsResponse = {
      data: null,
      error: "",
      success: false,
    };

    try {
      const result = await fetch(
        `${coinmarketcapBaseURL}/global-metrics/quotes/latest`,
        {
          headers: coinmarketcapHeader,
        }
      );

      const { status, data } = (await result.json()) as {
        status: IRecord;
        data: IRecord;
      };

      if (status.error_code != 0) {
        throw status.error_message;
      }

      const {
        active_cryptocurrencies,
        total_cryptocurrencies,
        defi_volume_24h,
        defi_market_cap,
        defi_24h_percentage_change,
        quote: {
          USD: {
            total_market_cap,
            stablecoin_market_cap,
            derivatives_24h_percentage_change,
            total_market_cap_yesterday_percentage_change,
            total_volume_24h_yesterday_percentage_change,
            altcoin_market_cap,
            altcoin_volume_24h,
          },
        },
      } = data;

      response = {
        data: {
          active_cryptocurrencies: {
            text: active_cryptocurrencies,
            isPercent: false,
          },
          total_cryptocurrencies: {
            text: total_cryptocurrencies,
            isPercent: false,
          },
          defi_volume_24h: {
            text: defi_volume_24h,
            isPercent: false,
          },
          defi_market_cap: {
            text: defi_market_cap,
            isPercent: false,
          },
          defi_24h_percentage_change: {
            text: defi_24h_percentage_change,
            isPercent: true,
          },
          stablecoin_market_cap: {
            text: stablecoin_market_cap,
            isPercent: true,
          },
          derivatives_24h_percentage_change: {
            text: derivatives_24h_percentage_change,
            isPercent: false,
          },
          total_market_cap: {
            text: total_market_cap,
            isPercent: false,
          },
          total_market_cap_yesterday_percentage_change: {
            text: total_market_cap_yesterday_percentage_change,
            isPercent: false,
          },
          total_volume_24h_yesterday_percentage_change: {
            text: total_volume_24h_yesterday_percentage_change,
            isPercent: false,
          },
          altcoin_market_cap: {
            text: altcoin_market_cap,
            isPercent: true,
          },
          altcoin_volume_24h: {
            text: altcoin_volume_24h,
            isPercent: true,
          },
        },
        error: "",
        success: true,
      };
    } catch (error) {
      response = {
        ...response,
        error: `${error}`,
      };
    } finally {
      return response;
    }
  };
