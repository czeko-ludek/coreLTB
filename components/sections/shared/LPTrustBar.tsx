import { Icon, type IconName } from '@/components/ui/Icon';

export interface TrustItem {
  icon: IconName;
  title: string;
  description: string;
}

const defaultItems: TrustItem[] = [
  {
    icon: 'hardHat',
    title: '200+ domów',
    description: 'Zrealizowanych projektów na Śląsku i w Małopolsce',
  },
  {
    icon: 'coins',
    title: 'Stała cena',
    description: 'Kwota z umowy to kwota końcowa — bez niespodzianek',
  },
  {
    icon: 'clock',
    title: 'Gwarancja terminu',
    description: 'Harmonogram realizacji zapisany w umowie',
  },
  {
    icon: 'shieldCheck',
    title: '10 lat gwarancji',
    description: 'Na konstrukcję i materiały użyte w budowie',
  },
];

interface LPTrustBarProps {
  items?: TrustItem[];
}

export const LPTrustBar = ({ items = defaultItems }: LPTrustBarProps) => {
  return (
    <section className="bg-background-light py-12 md:py-16 border-y border-border-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-[88px] h-[88px] mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Icon name={item.icon} size="xl" className="text-primary !w-11 !h-11" />
              </div>
              <h3 className="font-bold text-text-primary text-body-md md:text-h5">
                {item.title}
              </h3>
              <p className="text-body-sm text-text-muted mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
