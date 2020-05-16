import {ConfigCommentOrEmptyLineInterface} from "./ConfigCommentOrEmptyLineInterface";

export interface DefaultConfigDataInterface<T> {
    payload: Array<T | ConfigCommentOrEmptyLineInterface>
}
