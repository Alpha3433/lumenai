import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, UserCog, Users, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserGroupProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  imageSrc: string;
}

const UserGroupCard: React.FC<UserGroupProps> = ({
  icon,
  title,
  description,
  delay,
  imageSrc
}) => {
  const controls = useAnimation();
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 100
      }
    }
  };
  const iconVariants = {
    hidden: {
      scale: 0.2,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay + 0.2,
        type: 'spring',
        stiffness: 200
      }
    }
  };
  return <motion.div ref={ref} initial="hidden" animate={controls} variants={cardVariants} className="h-full">
      <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 overflow-hidden group">
        <CardContent className="p-6 h-full flex flex-col">
          <motion.div variants={iconVariants} className="mb-4 flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
              <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {icon}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>;
};

const WhoItsForSection = () => {
  const controls = useAnimation();
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  const subtitleVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  const decorativeLineVariants = {
    hidden: {
      width: "0%"
    },
    visible: {
      width: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };
  const highlightVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };
  const userGroups = [{
    icon: <Code className="h-6 w-6" />,
    title: "Indie Hackers",
    description: "You're building solo or with a small team. You need to validate quickly without burning cash or time.",
    delay: 0.2,
    imageSrc: "/lovable-uploads/97ff5ee9-49d4-4693-aae5-13ea2becadaa.png"
  }, {
    icon: <UserCog className="h-6 w-6" />,
    title: "Solo Founders",
    description: "Every minute counts when you're wearing all the hats. Automate the validation to focus on building.",
    delay: 0.4,
    imageSrc: "/lovable-uploads/7757e8bc-1c7c-4b6e-b345-1c5b912e5019.png"
  }, {
    icon: <Users className="h-6 w-6" />,
    title: "Product Teams",
    description: "Test new feature ideas and products with real market data before committing engineering resources.",
    delay: 0.6,
    imageSrc: "/lovable-uploads/7964ca29-0497-47f8-8ab8-48c35b4bc2a0.png"
  }, {
    icon: <Palette className="h-6 w-6" />,
    title: "Creators & Makers",
    description: "Turn your creative concepts into validated business ideas with clear market feedback.",
    delay: 0.8,
    imageSrc: "/lovable-uploads/bf8f5448-2228-498a-a525-f187d04fa676.png"
  }];
  return <section id="who-its-for" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-16 relative">
          <motion.div className="inline-flex items-center justify-center gap-2 mb-3" variants={titleVariants} initial="hidden" animate={controls}>
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19C17.2091 19 19 17.2091 19 15C19 12.7909 17.2091 11 15 11C12.7909 11 11 12.7909 11 15C11 17.2091 12.7909 19 15 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 13C8.10457 13 9 12.1046 9 11C9 9.89543 8.10457 9 7 9C5.89543 9 5 9.89543 5 11C5 12.1046 5.89543 13 7 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 9V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 13V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Who It's For
            </motion.h2>
          </motion.div>
          
          <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg" variants={subtitleVariants} initial="hidden" animate={controls}>
            Built for idea-makers at every stage of the journey.
          </motion.p>
          
          <motion.div className="absolute left-1/2 -bottom-4 h-1 bg-gradient-to-r from-blue-500 to-green-500 transform -translate-x-1/2 rounded-full" variants={decorativeLineVariants} initial="hidden" animate={controls} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userGroups.map((group, index) => <UserGroupCard key={index} icon={group.icon} title={group.title} description={group.description} delay={group.delay} imageSrc={group.imageSrc} />)}
        </div>

        <motion.div className="mt-16 text-center" variants={highlightVariants} initial="hidden" animate={controls}>
          <p className="text-lg text-gray-700 dark:text-gray-200 inline-block px-8 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 font-bold">
            If you've got ideas — this tool gives you clarity.
          </p>
        </motion.div>
      </div>
    </section>;
};

export default WhoItsForSection;
