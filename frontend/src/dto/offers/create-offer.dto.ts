import { City, Location, Type } from '../../types/types';

export class CreateOfferDto {
  public title!: string;

  public description!: string;

  public date!: Date;

  public city!: City;

  public imagePreview!: string;

  public images!: string[];

  public isPremium!: boolean;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: string[];

  public hostId!: string;

  public location!: Location;
}