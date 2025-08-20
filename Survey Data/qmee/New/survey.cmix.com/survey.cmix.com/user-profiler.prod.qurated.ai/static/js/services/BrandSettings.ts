import axios from 'axios';
import type { BrandSettingType } from '../types/BrandSetting';
import profilingApiUrl from '../utils/profilingApiUrl';

export async function getBrandSettings(token: string) {
  let path = `${profilingApiUrl(token)}/provider/brand-settings?token=${token}`

  try {
    const { data } = await axios.get<BrandSettingType>(
      path,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return {};
    } else {
      console.log('unexpected error: ', error);
      return {};
    }
  }
}