import { SpecItemType } from '@contracts';
import {
  ArrowUpDown,
  Bath,
  Bolt,
  Building,
  Car,
  DoorOpen,
  Hammer,
  LayoutGrid,
  Ruler,
  ShieldAlert,
  Wifi,
  Wind,
} from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';

export const SPEC_ICON_MAP: Record<SpecItemType, FunctionalComponent> = {
  [SpecItemType.Floor]: Building,
  [SpecItemType.Area]: Ruler,
  [SpecItemType.CeilingHeight]: ArrowUpDown,
  [SpecItemType.Layout]: LayoutGrid,
  [SpecItemType.Bathroom]: Bath,
  [SpecItemType.FacilityReadiness]: Hammer,
  [SpecItemType.Entrance]: DoorOpen,
  [SpecItemType.Parking]: Car,
  [SpecItemType.Energy]: Bolt,
  [SpecItemType.Internet]: Wifi,
  [SpecItemType.Ventilation]: Wind,
  [SpecItemType.AlarmSystem]: ShieldAlert,
};
