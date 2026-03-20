import { Icon, type IconName } from '@/components/ui/Icon';

export interface StepItem {
  number: string;
  icon: IconName;
  title: string;
  description: string;
  /** Optional time badge (e.g. "1–2 dni") */
  time?: string;
}

interface LPStepsProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  steps: StepItem[];
}

export const LPSteps = ({ title, highlight, subtitle, steps }: LPStepsProps) => {
  const colsClass = steps.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <section className="bg-background-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            {title}{' '}
            {highlight && <span className="text-primary">{highlight}</span>}
          </h2>
          {subtitle && (
            <p className="mt-3 text-body-md text-gray-400 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className={`grid grid-cols-1 ${colsClass} gap-8 md:gap-6`}>
          {steps.map((step, idx) => (
            <div key={step.number} className="relative text-center">
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-9 left-[60%] w-[80%] h-px border-t border-dashed border-gray-600" />
              )}
              <div className="w-[74px] h-[74px] mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 relative">
                <Icon name={step.icon} size="xl" className="text-primary !w-8 !h-8" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full text-xs font-bold text-white flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              {step.time && (
                <span className="text-body-xs text-primary font-semibold bg-primary/10 px-2.5 py-0.5 rounded-full">{step.time}</span>
              )}
              <h3 className="font-semibold text-white text-body-md mt-3 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
