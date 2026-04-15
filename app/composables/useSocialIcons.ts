import Email from '~/components/base/icons/Email.vue';
import Phone from '~/components/base/icons/Phone.vue';
import Location from '~/components/base/icons/Location.vue';
import PhonePrimary from '~/components/base/icons/PhonePrimary.vue';
import TelegramSolid from '~/components/base/icons/TelegramSolid.vue';
import TelegramOutline from '~/components/base/icons/TelegramOutline.vue';
import VkSolid from '~/components/base/icons/VkSolid.vue';
import VkOutline from '~/components/base/icons/VkOutline.vue';


export const useSocialIcons = () => {
  const icons: Record<string, any> = {
    email: Email,
    phone: Phone,
    location: Location,
    phoneprimary: PhonePrimary,
    telegramoutline: TelegramOutline,
    telegram: TelegramSolid,
    vkoutline: VkOutline,
    vk: VkSolid,
  };

  const getIcon = (serviceName: string) => {
    return icons[serviceName.toLowerCase()] || null;
  };

  return {
    getIcon
  };
};