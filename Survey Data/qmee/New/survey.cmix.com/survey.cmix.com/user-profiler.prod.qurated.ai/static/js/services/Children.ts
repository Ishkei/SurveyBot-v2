import { LocalisationType, OptionsType } from '../types/Children'
import dayjs, { Dayjs } from 'dayjs'

const MAX_AGE = 18

export const range = (from: number, to: number): Array<number> => {
  if (to === undefined) {
    return Array(from).fill(0).map((_, i) => i)
  } else if (from < to) {
    return Array(to - from + 1).fill(0).map((_, i) => from + i)
  } else if (from > to) {
    return Array(from - to + 1).fill(0).map((_, i) => from - i)
  } else {
    return []
  }
}

export const GENDER = {
  MALE: 'm',
  FEMALE: 'f',
  UNKNOWN: 'u',
}

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const OBSERVED_GENDERS: Array<string> = [GENDER.MALE, GENDER.FEMALE]

const isUnborn = (date: Dayjs | undefined) => date && date > dayjs().subtract(1, 'month')
const isValidUnborn = (date: Dayjs | undefined) => date && date < dayjs().add(9, 'months')
const isValidAge = (date: Dayjs | undefined) => isValidUnborn(date)

export class Child {
  gender: 'm' | 'f' | 'u' | undefined
  year: number | undefined
  month: number | undefined
  id: string

  constructor(key?: string) {
    const [gender, year, month] = key ? key.split('-') : []
    this.gender = gender === "m" || gender === "f" || gender === "u" ? gender : undefined;
    this.year = year ? parseInt(year) : undefined
    this.month = month ? parseInt(month) : undefined;

    const uniqid = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
    this.id = uniqid
  }

  static childrenFromKey(children: string) {
    return children ? children.split(/[,|]/).map(child => new Child(child)) : []
  }

  toKey(): string {
    if(!this.gender && isUnborn(this._date())){
      return ["u", this.year, this.month].join('-')
    }

    return [this.gender, this.year, this.month].join('-')
  }

  static childrenToKey(children: Array<Child>) {
    return children ? children.map(child => child.toKey()).join('|') : ''
  }

  _date(): Dayjs | undefined {
    if(!this.year) return undefined;

    let date = dayjs().year(this.year).date(1);
    if(this.month) date = date.month(this.month - 1);

    return date;
  }

  isValid(): boolean {
    const date = this._date()
    if (!this.month || !date) {
      return false
    }

    return this.isValidGender();
  }

  isValidGender(): boolean {
    const date = this._date();

    if (isUnborn(date)) {
      if(!isValidUnborn(date)) return false
      if(!this.gender || this.gender === GENDER["UNKNOWN"]) return true;
    }
  
    return !!this.gender && OBSERVED_GENDERS.includes(this.gender);
  }

  getValidMonths(): Array<number> {
    const isValidMonth = (month: number) => !!this.year && isValidAge(dayjs().year(this.year).month(month - 1));
    return this.year ? range(1, 12).filter(isValidMonth) : range(1, 12)
  }

  getValidGenders(): Array<string> {
    return isUnborn(this._date()) ? [GENDER.FEMALE, GENDER.MALE, GENDER.UNKNOWN] : [GENDER.FEMALE, GENDER.MALE]
  }

  getValidYears(): Array<number> {
    const year = dayjs().year()
    const expectingYear = dayjs().add(9, 'months').year()
    return year === expectingYear ? range(year, year - MAX_AGE) : range(year + 1, year - MAX_AGE)
  }

  isExpecting(): boolean {
    if(!this?.year || !this?.month) return false;

    let date = dayjs().year(this.year).date(1).month(this.month - 1)

    return date >= dayjs().date(1);
  }

  setYear(year: number | undefined) {
    this.year = year
  }

  setMonth(month: number | undefined) {
    this.month = month
  }

  setGender(gender: 'm' | 'f' | 'u' | undefined) {
    this.gender = gender
  }

  getShortGenderLabel(localisation: LocalisationType) {
    const genderShorts = localisation.gender_shorts;
    
    return this.gender ? genderShorts[this.gender] : ''
  }

  getLabel(localisation: LocalisationType) {
    const dateFormatted = this.getDateFormatted(localisation)
    const gender = this.getShortGenderLabel(localisation)

    if (gender) {
      return `${gender} ${dateFormatted}`
    } else {
      return dateFormatted
    }
  }

  getDateFormatted(localisation: LocalisationType) {
    const date = this._date()
    if(this.month){
      return date ? date.format(localisation.date_format) : '-'
    }else{
      return this.year
    }
  }

  static childrenToLabel(children: Array<Child>, localisation: LocalisationType): string {
    if (children && children.length > 0) {
      return children.map(child => child.getLabel(localisation)).join(', ')
    } else {
      return localisation.no_children
    }
  }

  createOptions(localisation: LocalisationType): OptionsType {
    const months = localisation.months || ALL_MONTHS;
    const formatMonth = (month: number): string => months[month - 1]
    const formatYear = (year: number): string => {
      const currentYear = dayjs().year();
      if (year > currentYear) {
        return dayjs().year(year).format(localisation.nextYearFormat)
      } else if (year === currentYear) {
        return dayjs().year(year).format(localisation.currentYearFormat)
      } else {
        return year.toString()
      }
    }
    const genderLabels = localisation.gender_labels
    return {
      years: this.getValidYears().map(year => ({
        label: formatYear(year),
        key: year
      })),
      months: this.getValidMonths().map(month => ({
        label: formatMonth(month),
        key: month
      })),
      genders: this.getValidGenders().map((gender: string) => ({
        label: genderLabels[gender],
        key: gender
      }))
    }
  }
}
