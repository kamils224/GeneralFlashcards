import axios from "axiosInstance";
import {ApiGetError} from "./errors.api";

export class CollectionDto {
  constructor(public id: number, public title: string,
              public description: string, public dateCreated: Date,
              public isPublic: boolean, public flashcardsCount: number,
  ) {}
  public static fromResponse(data: Record<string, any>) : CollectionDto {
    return new CollectionDto(
        data.id,
        data.title,
        data.description,
        new Date(data.date_created),
        data.is_public,
        data.flashcards_count,
    );
  }
}

class CollectionsApi {
  async getCollections() {
    try {
      const response = await axios.get("api/collections/user-collections/");
      return response.data.map((data: any)=> CollectionDto.fromResponse(data));
    } catch {
      throw new ApiGetError();
    }
  }
}

export default new CollectionsApi();
