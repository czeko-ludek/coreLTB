// Centralized exports for Section components (Organisms)
// This file provides a single entry point for all section components

// ============================================
// ACTIVE SECTIONS (Currently used in project)
// ============================================

// Global Layout
export { Header } from './Header';
export type { HeaderProps } from './Header';

export { Footer } from './Footer';
export type { FooterProps } from './Footer';

// Homepage Sections
export { HeroSection } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

export { AboutCompanySection } from './AboutCompanySection';
export type { AboutCompanySectionProps } from './AboutCompanySection';

export { ServicesSection } from './ServicesSection';
export type { ServicesSectionProps } from './ServicesSection';

export { ServicesBentoSection } from './ServicesBentoSection';
export type { ServicesBentoSectionProps } from './ServicesBentoSection';

export { ServiceShowcaseSection } from './ServiceShowcaseSection';
export type { ServiceShowcaseSectionProps } from './ServiceShowcaseSection';

export { HowItWorksSection } from './HowItWorksSection';
export type { HowItWorksSectionProps } from './HowItWorksSection';

export { ProjectsSection } from './ProjectsSection';
export type { ProjectsSectionProps } from './ProjectsSection';

export { TeamSection } from './TeamSection';
export type { TeamSectionProps } from './TeamSection';

export { TestimonialsSection } from './TestimonialsSection';
export type { TestimonialsSectionProps } from './TestimonialsSection';

export { GoogleReviewsSection } from './GoogleReviewsSection';
export type { GoogleReviewsSectionProps } from './GoogleReviewsSection';

export { BlogSection } from './BlogSection';
export type { BlogSectionProps } from './BlogSection';

// Service Pages V2 Sections
export { EmotionalHeroSection } from './EmotionalHeroSection';
export type { EmotionalHeroSectionProps } from './EmotionalHeroSection';

export { PhilosophyTimelineSection } from './PhilosophyTimelineSection';
export type { PhilosophyTimelineSectionProps } from './PhilosophyTimelineSection';

export { CooperationTimelineSection } from './CooperationTimelineSection';
export type { CooperationTimelineSectionProps } from './CooperationTimelineSection';

export { CooperationTimelineSectionNoLine } from './CooperationTimelineSectionNoLine';
export type { CooperationTimelineSectionNoLineProps } from './CooperationTimelineSectionNoLine';

export { ServicesAccordionSection } from './ServicesAccordionSection';
export type { ServicesAccordionSectionProps } from './ServicesAccordionSection';

export { FAQTwoColumnsSection } from './FAQTwoColumnsSection';
export type { FAQTwoColumnsSectionProps, FAQItem as FAQTwoColumnsItem } from './FAQTwoColumnsSection';

export { ContactCTASection } from './ContactCTASection';
export type { ContactCTASectionProps } from './ContactCTASection';

export { ContactHeroSection } from './ContactHeroSection';
export type { ContactHeroSectionProps } from './ContactHeroSection';

// Stats Section (available but not currently used)
export { StatsSection } from './StatsSection';
export type { StatsSectionProps } from './StatsSection';

// Partners Section (available but currently disabled - missing images)
export { PartnersSection } from './PartnersSection';
export type { PartnersSectionProps } from './PartnersSection';

// About Page Sections
export { AboutIntroSection } from './AboutIntroSection';
export type { AboutIntroSectionProps } from './AboutIntroSection';

export { CompetenciesSection } from './CompetenciesSection';
export type { CompetenciesSectionProps } from './CompetenciesSection';

// Aliases for new naming convention (same components)
export { AboutIntroSection as AboutHeroIntroLight } from './AboutIntroSection';
export { CompetenciesSection as AboutCompetenciesLight } from './CompetenciesSection';

export { BusinessResponsibilitySection } from './BusinessResponsibilitySection';
export type { BusinessResponsibilitySectionProps } from './BusinessResponsibilitySection';

export { BentoContactSection } from './BentoContactSection';
export type { BentoContactSectionProps, ContactInfo } from './BentoContactSection';

export { BentoOfferSection } from './BentoOfferSection';

export { BentoAreasSection } from './BentoAreasSection';

export { AreasSection } from './AreasSection';
export type { AreasSectionProps, Hub, City } from './AreasSection';

export { AreasOfOperationSection } from './AreasOfOperationSection';
export type { AreasOfOperationSectionProps, AreasHub, AreasCity } from './AreasOfOperationSection';

export { BentoKnowledgeSection } from './BentoKnowledgeSection';

// Local Pages Sections
export { DistrictsSection } from './DistrictsSection';
export type { DistrictsSectionProps } from './DistrictsSection';

export { PricingSection } from './PricingSection';
export type { PricingSectionProps } from './PricingSection';

export { SimpleImageTextSection } from './SimpleImageTextSection';
export type { SimpleImageTextSectionProps } from './SimpleImageTextSection';

export { IntroSection } from './IntroSection';
export type { IntroSectionProps } from './IntroSection';

// Interactive Map Section (Obszar Działania Hub)
export { InteractiveMapSection } from './InteractiveMapSection';

// Bento Blog Section
export { BentoBlogSection } from './BentoBlogSection';
export type {
  BentoBlogSectionProps,
  Breadcrumb,
  BlogCategory,
  BlogAuthor,
  BlogPost,
  FeaturedPost,
  TallPost,
  StandardPost,
  QuoteBlock,
  WidePost,
  NewsletterBlock,
  RecommendedPost,
  ImagePost,
  BlogGridItem
} from './BentoBlogSection';

// Blog Post Content (Single Post Page)
export { BlogPostContent } from './BlogPostContent';
export type {
  BlogPostContentProps,
  BlogPostData,
  BlogContentBlock,
  RelatedPost,
  FAQItem as BlogFAQItem,
} from './BlogPostContent';

// Projects Listing Section
export { ProjectsListingSection } from './ProjectsListingSection';
export type { ProjectsListingSectionProps, Breadcrumb as ProjectsBreadcrumb } from './ProjectsListingSection';

// Local Page Content Section (Blog-style layout)
export { LocalPageContentSection } from './LocalPageContentSection';
export type {
  LocalPageContentSectionProps,
  LocalPageContent,
  LocalPageSection,
  ContentBlock as LocalContentBlock,
  District,
  DistrictsData,
  FAQItem as LocalFAQItem,
  FAQData,
} from './LocalPageContentSection';
