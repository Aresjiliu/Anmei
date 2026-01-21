import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { Card3D } from '@/components/ui/Card3D';
import { GlitchText } from '@/components/ui/GlitchText';
import docLiu from '../../doctor/刘劲松.png';
import docWu from '../../doctor/武继祥.png';
import docWang from '../../doctor/王健全.jpg';
import docGu from '../../doctor/顾蕊.jpg';
import docYao from '../../doctor/姚娟.png';
import docWangCheng from '../../doctor/王人成.jpg';

// 联盟企业数据
const allianceCompanies = [
  {
    id: 1,
    name: '广州博尔特假肢矫形器有限公司',
    title: '技术底座与数字化适配',
    corePosition: '中高端智能假肢与数字化适配专家',
    techValue: '为联盟提供高端假肢与临床适配能力的技术底座',
    keyCapabilities: [
      '智能下肢与肌电上肢假肢成熟产品体系',
      '3D数字化扫描与数字孪生适配技术',
      '拥有多项核心专利及国际认证'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Robotic%20prosthetic%20leg%2C%20digital%20scanning%20technology%2C%20medical%20equipment%2C%203D%20modeling&sign=967d9932a97cea5d0c04dfa38a0a013f'
  },
  {
    id: 2,
    name: '青岛联康假肢矫形器有限公司',
    title: '工程化落地与标准制造',
    corePosition: '智能仿生假肢与工程化能力代表',
    techValue: '提供工程化落地与标准化制造能力，确保产品的一致性与高标准',
    keyCapabilities: [
      '智能膝关节与AI矫形系统研发',
      'ISO 13485、CE、FDA 体系完备',
      '高度自主的供应链体系与稳定产能'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Prosthetic%20manufacturing%20factory%2C%20precision%20engineering%2C%20quality%20control%2C%20medical%20standards&sign=97e2387aa05bb415a2c5af41f236f8f1'
  },
  {
    id: 3,
    name: '丹阳假肢厂有限公司',
    title: '规模化供给与交付',
    corePosition: '规模化供给与基层覆盖的稳定力量',
    techValue: '确保项目在大规模需求下的稳定供给与可持续交付',
    keyCapabilities: [
      '超50年行业积累，卓越的成本控制能力',
      '年产假肢、矫形器规模居行业前列',
      '深度服务于大规模公共康复项目'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Large-scale%20prosthetic%20production%20line%2C%20warehouse%2C%20logistics%2C%20mass%20production&sign=f29274ce4f71c49ce9ada0a7b3b38c54'
  },
  {
    id: 4,
    name: '山东助仁康复辅助器发展有限公司',
    title: '系统性康复解决方案',
    corePosition: '智能康复机器人与居家康复系统',
    techValue: '提供"假肢之后"的系统性康复与护理解决方案',
    keyCapabilities: [
      '康复机器人、护理床、外骨骼完整产品线',
      '康复云平台，无缝对接社区与医保体系',
      'ISO 13485、CE、FDA 预审通过'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Rehabilitation%20robot%2C%20elderly%20care%20equipment%2C%20cloud%20platform%2C%20home%20rehabilitation&sign=9507ff7c12b20829215d5421edd9ad30'
  },
  {
    id: 5,
    name: '深圳呵康科技有限公司',
    title: '康复技术的未来上限',
    corePosition: '高端康复机器人与AI康复平台',
    techValue: '代表联盟在高端智能康复领域的技术上限',
    keyCapabilities: [
      '国内领先的上下肢康复机器人技术',
      'AI人工智能、VR虚拟现实与云平台的深度融合',
      '高研发投入与密集专利布局'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Advanced%20rehabilitation%20robot%2C%20AI%20technology%2C%20VR%20virtual%20reality%2C%20cloud%20platform&sign=3710b6fb262e0feed25962470f3aec09'
  },
  {
    id: 6,
    name: '湖南轶疆医疗科技有限公司',
    title: '前沿探索与脑机接口',
    corePosition: '智能仿生假肢与脑机接口前沿探索者',
    techValue: '为联盟打开未来十年的技术想象空间',
    keyCapabilities: [
      '脑电/肌电融合控制技术',
      '与顶级医疗机构（如湘雅医院）建立深度科研合作',
      '下一代智能仿生假肢与外骨骼研发'
    ],
    image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Brain-computer%20interface%2C%20neural%20technology%2C%20biomedical%20research%2C%20future%20prosthetics&sign=8ca93af7b3b0068f312c028a76c3d672'
  }
];

// 指导专家（使用 doctor 文件夹中的前六位，文本来自本地 MD 文件）
const experts = [
  {
    id: 1,
    name: '武继祥',
    title: '陆军军医大学西南医院康复科教授、主任医师',
    specialty: '康复医学、假肢矫形器临床应用、康复辅具标准制定',
    bio: '从事康复医学临床、教学和科研30余年，长期在截肢及康复辅具领域一线工作。',
    contributions: '担任中国康复医学会康复辅具应用专业委员会主任委员、牵头制定国家与行业标准，主编多部教材并主持多项教学与科研工作。',
    achievements: '获国家发明专利及多项实用新型/外观专利，发表论文30+篇，主编和参编多部教材。',
    image: docWu
  },
  {
    id: 2,
    name: '顾蕊',
    title: '中国康复研究中心北京博爱医院骨科及骨关节康复科副主任医师（医学博士）',
    specialty: '骨科康复、截肢康复',
    bio: '具有多年骨科及骨科康复临床与教学经验，兼具国际康复医疗经验。',
    contributions: '担任多项学会委员并参与学术编委工作，将先进国际康复理念与技术融入临床实践，长期开展截肢康复专病门诊。',
    achievements: '在骨科康复与截肢康复领域有丰富临床案例与教学成果，参与多项学术与临床项目。',
    image: docGu
  },
  {
    id: 3,
    name: '王健全',
    title: '中国康复研究中心北京博爱医院矫形外科主任医师、教授、博士生导师',
    specialty: '矫形外科、骨科康复、假肢技术',
    bio: '擅长截肢后残肢处理与功能重建，长期从事复杂截肢和保肢手术及康复工作。',
    contributions: '主导复杂截肢及残肢功能重建临床治疗，构建并完善康复与矫形外科的协同流程。',
    achievements: '在临床一线积累丰富经验，承担多项临床任务与教学工作。',
    image: docWang
  },
  {
    id: 4,
    name: '刘劲松',
    title: '中国康复研究中心北京博爱医院假肢矫形中心主任、首都医科大学康复医学院假肢矫形教研室主任',
    specialty: '假肢矫形技术、脊柱侧弯矫形器设计、3D数字化技术应用',
    bio: '国际一级假肢矫形师，致力于假肢矫形技术与教学人才培养。',
    contributions: '主导行业技术规范制定，推动手术康复与假肢适配一体化服务，建立国际认证人才培养基地。',
    achievements: '推动国内首批国际认证假肢矫形人才培养，承担并主导多项教学与临床创新项目。',
    image: docLiu
  },
  {
    id: 5,
    name: '姚娟',
    title: '国家康复辅具研究中心北京辅具装配部技术主任',
    specialty: '假肢矫形器制作、材料研发、临床装配',
    bio: '长期从事假肢、矫形器的材料与装配研究，拥有丰富的一线实操经验。',
    contributions: '参与并编制行业标准，主导材料试验与工艺迭代，承担国家重点研发项目并为海外地区装配大量假肢。',
    achievements: '全国技术能手、国际二级矫形器制作师，编制多项行业标准并参与国家级研发与推广项目。',
    image: docYao
  },
  {
    id: 6,
    name: '王人成',
    title: '清华大学机械工程系副研究员',
    specialty: '智能假肢、康复机器人、骨植入式假肢',
    bio: '长期从事智能假肢与康复机器人研究，专注骨植入式假肢与仿生控制。',
    contributions: '主持国家863等重大项目，推动骨植入式假肢及智能下肢假肢的研发与工程化。',
    achievements: '获河北省科技进步二等奖，拥有多项发明专利并主编专业教材，培养大批专业人才。',
    image: docWangCheng
  }
];

// 核心解决方案数据
const coreCapabilities = [
  {
    title: '核心假肢模块与标准件',
    description: '高精度、模块化的基础组件',
    icon: 'fa-cogs',
    color: 'blue'
  },
  {
    title: '智能关节系统',
    description: '基于AI算法的仿生关节控制',
    icon: 'fa-robot',
    color: 'indigo'
  },
  {
    title: '3D数字化扫描与制造',
    description: '个性化定制的数字孪生解决方案',
    icon: 'fa-cube',
    color: 'violet'
  },
  {
    title: '全周期康复支持',
    description: '从穿戴到复健的机器人与云服务体系',
    icon: 'fa-heart-pulse',
    color: 'purple'
  }
];

// 未来愿景数据
const futureVision = [
  {
    title: '再生医学与组织修复',
    description: '引入干细胞技术，探索生物学层面的康复',
    icon: 'fa-dna'
  },
  {
    title: '脑机接口 (BCI)',
    description: '实现大脑与机械肢体的直接神经互联',
    icon: 'fa-brain'
  },
  {
    title: '中医融合疗法',
    description: '结合传统医学与现代康复装备的创新实践',
    icon: 'fa-hand-fist'
  },
  {
    title: 'PTSD与创伤康复',
    description: '建立从生理到心理的完整支持体系',
    icon: 'fa-heart'
  }
];

// 动画卡片组件
const AnimatedCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

// 动画文本组件
const AnimatedText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const truncate = (text: string, max = 80) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max - 1).trim() + '…' : text;
  };

  // 顶部导航带鼠标跟随下划线的按钮
  const NavHoverButton = ({ children, onClick, delay = 0 }: { children: React.ReactNode; onClick?: () => void; delay?: number }) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [x, setX] = useState(0);
    const [show, setShow] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="relative"
      >
        <button
          ref={ref}
          onClick={onClick}
          onMouseMove={(e) => {
            const rect = ref.current?.getBoundingClientRect();
            if (rect) setX(e.clientX - rect.left);
            setShow(true);
          }}
          onMouseLeave={() => setShow(false)}
          className="text-gray-300 text-base font-medium hover:text-gray-100 transition-all bg-transparent"
        >
          {children}
        </button>

        <div className="pointer-events-none absolute left-0 right-0 bottom-0 flex justify-start">
          <div
            style={{ left: x, width: 44 }}
            className={`absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform -translate-x-1/2 transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-tech-dark text-gray-200 font-sans relative overflow-x-hidden">
      {/* 粒子背景和光晕 */}
      <ParticleBackground />
      <MouseGlow />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 背景层：使用真实假肢奔跑照片 */}
        <div className="absolute inset-0 z-0">
          {/* 背景图片 */}
          <img
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Person%20with%20prosthetic%20limb%20enjoying%20an%20active%20lifestyle%2C%20sunset%20background%2C%20warm%20glow%2C%20inspiring%20scene%2C%20high%20quality%20medical%20technology&sign=cca9dafc5ea3c5e6dc6354c1474aacde"
            alt="高端医疗科技假肢"
            className="w-full h-full object-cover"
          />
          {/* 蓝紫色渐变覆盖层 - 与后续页面颜色协调 */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/45 via-purple-600/35 to-blue-600/40 z-10"></div>
          {/* 额外的深色覆盖层确保文字对比度 */}
          <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/25 via-transparent to-tech-dark/35 z-11"></div>
          {/* 网格纹理 - 细微强度 */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 z-5"></div>
          {/* 扫描线效果 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-blue/10 to-transparent animate-scan z-8"></div>
        </div>

        {/* 装饰线条 */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-tech-blue/20 to-transparent rounded-full blur-3xl z-1"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-tech-purple/20 to-transparent rounded-full blur-3xl z-1"></div>

        {/* Hero 内容 */}
        <div className="container mx-auto px-4 z-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* 上标签已删除以保持设计简洁 */}

            {/* 主标题 - 使用故障效果 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter leading-none"
            >
              <span className="gradient-text">重塑生命</span>
              <br />
              <span className="glow-text">可能性的技术</span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 tracking-wide"
            >
              Technological Infrastructure for Reshaping Lives
            </motion.p>

            {/* 描述文本 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              我们不是单一产品的生产商，而是假肢与康复全链条技术的整合者与体系构建者。
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('alliance')}
                className="btn-glow px-8 py-4 rounded-lg font-bold text-lg cursor-pointer"
              >
                探索技术联盟
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('who-we-are')}
                className="px-8 py-4 rounded-lg font-bold text-lg border border-tech-purple text-tech-purple hover:bg-tech-purple/20 transition-all cursor-pointer"
              >
                了解更多
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* 滚动指示器 */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-tech-blue"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <i className="fa-solid fa-chevron-down text-3xl glow-text"></i>
        </motion.div>

        {/* 顶部左侧 - Anmei 品牌标识 */}
        <div className="absolute top-6 left-12 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-4xl tracking-widest"
          >
            <span className="text-gray-100">Anmei</span>
          </motion.div>
        </div>

        {/* 顶部右侧导航按钮（超小屏隐藏以避免与品牌重叠） */}
        <div className="absolute top-4 right-4 z-20">
          <div className="hidden sm:flex gap-8 items-center">
            <NavHoverButton delay={0.4} onClick={() => scrollToSection('experts')}>指导专家</NavHoverButton>
            <NavHoverButton delay={0.5} onClick={() => scrollToSection('alliance')}>合作伙伴</NavHoverButton>
            <NavHoverButton delay={0.6} onClick={() => scrollToSection('footer')}>关于我们</NavHoverButton>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section id="who-we-are" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-tech-navy/30 to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">安美集团的角色</span>
            </h2>
            <p className="text-tech-blue text-lg mb-4 font-medium tracking-wide">Technology Integrator & Project Organizer</p>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              在碎片化的医疗器械市场中，安美集团致力于提供<span className="text-tech-blue font-semibold">"体系级供给"</span>。我们通过联盟化组织形式，整合行业顶尖资源，为大规模、长周期的康复需求提供结构性的解决方案。
            </p>
          </motion.div>

          {/* 三个卡片 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: 'fa-microchip',
                title: '技术合成商',
                desc: '整合从假肢制造到智能康复的全链路技术。',
                delay: 0.1
              },
              {
                icon: 'fa-network-wired',
                title: '资源组织者',
                desc: '连接科研、制造与临床应用，分散结构性风险。',
                delay: 0.2
              },
              {
                icon: 'fa-lightbulb',
                title: '方案提供商',
                desc: '不仅交付产品，更交付可升级的康复技术平台。',
                delay: 0.3
              }
            ].map((item, idx) => (
              <AnimatedCard key={idx} delay={item.delay}>
                <Card3D>
                  <div className="glass-card p-8 rounded-2xl h-full border border-tech-blue/30 hover:border-tech-blue/80 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-tech-blue/30 to-tech-purple/30 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-glow-md transition-all">
                      <i className={`fa-solid ${item.icon} text-tech-blue text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:glow-text transition-all">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      

      {/* ===== ALLIANCE SECTION ===== */}
      <section id="alliance" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-purple/5 to-transparent z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">以技术能力为核心</span>
            </h2>
            <p className="text-tech-blue text-lg mb-4 font-medium tracking-wide">A Synergistic Alliance Powered by Core Competencies</p>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              这不是简单的企业集合，而是围绕假肢与康复全生命周期形成的精密技术协同体系。
            </p>
          </motion.div>

          {/* 联盟公司卡片 */}
          <div className="space-y-16">
            {allianceCompanies.map((company, index) => (
              <AnimatedCard key={company.id} delay={index * 0.1}>
                <div className="glass-card rounded-2xl overflow-hidden border border-tech-blue/20 hover:border-tech-blue/50 transition-all duration-300">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:auto-cols-fr' : ''}`}>
                    {/* 图片部分 */}
                    <div className={`relative h-64 md:h-auto ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img
                        src={company.image}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                      {/* 覆盖层 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-tech-dark/40 to-transparent"></div>
                      {/* 编号 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-tech-blue to-tech-purple rounded-xl flex items-center justify-center"
                      >
                        <span className="text-2xl font-bold text-white">0{company.id}</span>
                      </motion.div>
                    </div>

                    {/* 内容部分 */}
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-tech-blue text-sm font-bold tracking-widest mb-3 uppercase"
                      >
                        {company.title}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
                      >
                        {company.name}
                      </motion.h3>

                      <div className="space-y-6">
                        {/* 核心定位 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">核心定位</p>
                          <p className="text-gray-200 text-base leading-relaxed">{company.corePosition}</p>
                        </motion.div>

                        {/* 技术价值 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest">技术价值</p>
                          <p className="text-gray-200 text-base leading-relaxed">{company.techValue}</p>
                        </motion.div>

                        {/* 关键能力 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">关键能力</p>
                          <ul className="space-y-2">
                            {company.keyCapabilities.map((capability, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <i className="fa-solid fa-check text-tech-green mt-1 flex-shrink-0"></i>
                                <span className="text-gray-300 text-sm">{capability}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* 指导专家团队（放在合作公司下方，篇幅更大） */}
          <div id="experts" className="mt-20 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">指导专家团队</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-8"></div>
                <p className="text-gray-400 max-w-2xl mx-auto">汇聚临床与工程方向的资深专家，为项目提供跨学科咨询与长期评估。</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {experts.map((doc, i) => (
                <AnimatedCard key={doc.id} delay={i * 0.12}>
                  <Card3D>
                    <div className="glass-card p-12 md:p-12 rounded-3xl h-full border border-tech-blue/20 hover:border-tech-blue/60 transition-all">
                      <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-48 h-48 md:w-44 md:h-44 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/5">
                          <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-tight">{doc.name}</h4>
                          <p className="text-tech-blue text-sm md:text-base mb-2">{doc.title}</p>
                          <p className="italic text-gray-400 text-sm mb-4">{doc.specialty}</p>

                          <p className="text-gray-200 text-base leading-relaxed mb-4">{doc.bio}</p>

                          <div className="">
                            <p className="font-semibold text-gray-200 mb-2">贡献与成就</p>
                            <ul className="list-inside space-y-2 text-gray-300 text-sm">
                              {String(((doc.contributions || '') + '；' + (doc.achievements || '')))
                                .split(/。|；|；|，|\n/)
                                .filter(Boolean)
                                .map(s => s.trim())
                                .slice(0,4)
                                .map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <span className="mt-1 text-tech-blue">•</span>
                                    <span className="leading-tight">{truncate(item, 90)}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES SECTION ===== */}
      <section id="capabilities" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-tech-navy/20 to-tech-dark/20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">核心解决方案</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              我们整合的不仅仅是产品，而是四大核心技术模块：
            </p>
          </motion.div>

          {/* 能力卡片网格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {coreCapabilities.map((capability, index) => {
              const colorConfig = {
                blue: { bg: 'from-tech-blue/20', border: 'tech-blue', text: 'text-tech-blue' },
                indigo: { bg: 'from-tech-purple/20', border: 'tech-purple', text: 'text-tech-purple' },
                violet: { bg: 'from-tech-green/20', border: 'tech-green', text: 'text-tech-green' },
                purple: { bg: 'from-tech-blue/20', border: 'tech-purple', text: 'text-tech-purple' },
              };
              const config = colorConfig[capability.color as keyof typeof colorConfig] || colorConfig.blue;

              return (
                <AnimatedCard key={index} delay={index * 0.15}>
                  <Card3D>
                    <div
                      className={`glass-card p-10 rounded-2xl border-l-4 h-full group hover:shadow-glow-md transition-all`}
                      style={{
                        borderLeftColor: `var(--tech-${capability.color === 'blue' ? 'blue' : capability.color === 'indigo' ? 'purple' : 'green'})`,
                      }}
                    >
                      <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${config.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                        <i className={`fa-solid ${capability.icon} text-3xl ${config.text}`}></i>
                      </div>
                      <h3 className={`text-lg font-bold text-white mb-4 group-hover:text-tech-blue transition-colors`}>{capability.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{capability.description}</p>

                      {/* 悬停时的装饰线 */}
                      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-tech-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </Card3D>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FUTURE VISION ===== */}
      <section id="vision" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-tech-purple/10 via-transparent to-tech-dark/20 z-0"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">不断向上生长的技术平台</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg leading-relaxed">
              我们的合作是一个可持续升级的生态系统。安美集团正致力于将技术边界拓展至更远的未来：
            </p>
          </motion.div>

          {/* 愿景卡片 */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {futureVision.map((item, index) => (
              <AnimatedCard key={index} delay={index * 0.15}>
                <Card3D>
                  <div className="glass-card p-8 rounded-2xl border border-tech-green/30 hover:border-tech-green/80 group h-full transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-tech-green/30 to-tech-blue/30 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-neon transition-all">
                      <i className={`fa-solid ${item.icon} text-tech-green text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-tech-green transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>

                    {/* 底部光线效果 */}
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-tech-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </Card3D>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="footer" className="py-16 bg-gradient-to-b from-transparent to-tech-navy/50 border-t border-tech-blue/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* 主信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-2 tracking-wider">
                安美集团 <span className="text-tech-blue">(Anmei Group)</span>
              </h3>
              <p className="text-tech-green text-lg mb-2 font-medium">全球假肢与康复技术体系整合商</p>
              <div className="w-24 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto"></div>
            </motion.div>

            {/* 联系信息 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center text-gray-400 space-y-2 mb-12"
            >
              <p>地址：中国上海市浦东新区张江高科技园区科苑路88号</p>
              <p>联系方式：<span className="text-tech-blue">+86 21 5888 8888</span> | <span className="text-tech-blue">info@anmeigroup.com</span></p>
              <p className="max-w-2xl mx-auto text-sm text-gray-400/90 mt-4">安美集团专注于将先进的假肢技术、康复工程与临床服务整合为可规模化交付的体系，致力于通过技术与跨学科协作提升患者的功能恢复与生活质量。</p>
            </motion.div>

            {/* 版权 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-tech-blue/20 pt-8 text-center text-gray-500 text-sm"
            >
              <p>版权所有 © 2026 Anmei Group. All Rights Reserved. | 技术由高端医疗科技赋能</p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
