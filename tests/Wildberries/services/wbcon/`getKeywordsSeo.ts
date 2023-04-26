import axios from 'axios'

import ChannelSeo from './`KeywordsSeo'

export interface GetKeywordsParams {
    keywords: string
}
export default getKeywordsSeo
type getKeywordsSeo = typeof getKeywordsSeo
async function getKeywordsSeo(params: GetKeywordsParams): Promise<ChannelSeo> {
    let { keywords } = params
    keywords = keywords.toLowerCase()

    const { data: channelSeo }: { data: ChannelSeo } = await axios.get(
        `https://wbcon.ru/wp-json/services-wb/v1/get_request_by_name_v3`,
        {
            params: {
                query: keywords.toLowerCase(),
            },
        }
    )

    return channelSeo
}
