// swiper.d.ts ou custom.d.ts

/**
 * Declaração para que o TypeScript saiba como lidar com os imports
 * específicos de CSS da biblioteca Swiper.
 */
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/autoplay';
declare module 'swiper/css/scrollbar';

// Caso você esteja importando qualquer outro arquivo .css, 
// você pode adicionar uma declaração mais genérica, se necessário.
// declare module '*.css';