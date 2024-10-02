import { IUserDetails, IUserProfile } from "../models/userProfile/user-profile.interface";
import UserProfile from "../models/userProfile/user-profile.model";
import { CustomError } from "../utils/CustomError";

export class ProfileService {
  constructor(private profileModel: typeof UserProfile = UserProfile) {}

  async getProfile(userId: string): Promise<IUserProfile | null> {
    return this.profileModel.findOne({ user: userId });
  }

  async createProfile(
    userId: string,
    profile: IUserDetails
  ): Promise<IUserProfile | null> {
    const existingProfile = await this.getProfile(userId);
    if (existingProfile) {
      throw new CustomError("Profile already exists", 400);
    }
    return this.profileModel.create({ ...profile, user: userId });
  }

  async updateProfile(
    userId: string,
    profile: IUserDetails
  ): Promise<IUserProfile | null> {
    const existingProfile = await this.getProfile(userId);
    if (!existingProfile) {
      throw new CustomError("Profile not found", 404);
    }
    return this.profileModel.findOneAndUpdate({ user: userId }, profile, {
      new: true,
    });
  }

  async deleteProfile(userId: string) {
    return this.profileModel.findOneAndDelete({ user: userId });
  }
}
