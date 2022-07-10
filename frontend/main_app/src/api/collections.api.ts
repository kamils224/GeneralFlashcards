import axios from "axiosInstance";
import {ApiCreateError, ApiGetError, ApiRemoveError} from "api/errors.api";

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

export interface CollectionCreatePayload {
  title: string;
  description: string;
}

class CollectionsApi {
  async getCollections() {
    try {
      const response = await axios.get("api/collection/user-collections/");
      return response.data.map((data: any)=> CollectionDto.fromResponse(data));
    } catch {
      throw new ApiGetError();
    }
  }
  async createCollection(payload: CollectionCreatePayload): Promise<CollectionDto> {
    try {
      const response = await axios.post("api/collection/", payload);
      return CollectionDto.fromResponse(response.data);
    } catch {
      throw new ApiCreateError();
    }
  }
  async removeCollection(collectionId: number): Promise<void> {
    try {
      await axios.delete(`api/collection/${collectionId}`);
    } catch {
      throw new ApiRemoveError();
    }
  }
}

export default new CollectionsApi();
