import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";

function Terms() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const sectionVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${
        isDark
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-4 ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
            >
              Terms of Service
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`h-1 rounded-full bg-gradient-to-r ${
                isDark
                  ? "from-primary via-primary-dark to-primary"
                  : "from-primary via-primary-dark to-primary"
              }`}
            ></motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          >
            Please read these terms carefully before using our services
          </motion.p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`p-4 rounded-xl mb-8 text-center ${
            isDark
              ? "bg-dark-bg-secondary border border-dark-border"
              : "bg-light-bg-secondary border border-light-border"
          }`}
        >
          <p className="text-sm">
            <span className="font-semibold">Last Updated:</span> January 15,
            2024
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* 1. Acceptance of Terms */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("acceptance")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                1. Acceptance of Terms
              </h2>
              {openSections.acceptance ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.acceptance ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  By accessing or using Codify's website, services, or
                  applications (collectively, the "Service"), you agree to be
                  bound by these Terms and Conditions ("Terms"). If you do not
                  agree to these Terms, you may not access or use the Service.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you
                  and Codify. Your use of the Service indicates your acceptance
                  of these Terms and any additional terms and conditions that
                  may be provided for specific services.
                </p>
                <p>
                  We may modify these Terms at any time, and such modifications
                  will be effective immediately upon posting. Your continued use
                  of the Service after any modification constitutes your
                  acceptance of the modified Terms.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* 2. Account Registration */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("registration")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                2. Account Registration
              </h2>
              {openSections.registration ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.registration ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Eligibility:</strong> To use certain features of the
                  Service, you must register for an account. You must be at
                  least 13 years old to create an account. If you are under 18,
                  you represent that you have obtained parental consent to use
                  the Service.
                </p>
                <p>
                  <strong>Account Information:</strong> You agree to provide
                  accurate, current, and complete information during the
                  registration process and to update such information to keep it
                  accurate, current, and complete.
                </p>
                <p>
                  <strong>Account Security:</strong> You are responsible for
                  safeguarding your account credentials and for any activities
                  or actions under your account. You agree to notify us
                  immediately of any unauthorized use of your account.
                </p>
                <p>
                  <strong>Account Types:</strong> Codify offers both free and
                  premium accounts. Premium account holders may access
                  additional features and content not available to free account
                  holders.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* 3. User Responsibilities */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("responsibilities")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                3. User Responsibilities
              </h2>
              {openSections.responsibilities ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.responsibilities ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Proper Use:</strong> You agree to use the Service only
                  for lawful purposes and in accordance with these Terms. You
                  agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    In any way that violates any applicable federal, state,
                    local, or international law or regulation
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or
                    promotional material without our prior written consent
                  </li>
                  <li>
                    To impersonate or attempt to impersonate Codify, a Codify
                    employee, another user, or any other person or entity
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone's use or enjoyment of the Service
                  </li>
                </ul>
                <p>
                  <strong>Content Standards:</strong> You are solely responsible
                  for all content that you upload, post, or otherwise make
                  available through the Service. You agree that your content
                  will not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Infringe any patent, trademark, trade secret, copyright, or
                    other intellectual property rights of any other person
                  </li>
                  <li>
                    Contain any material that is defamatory, obscene, indecent,
                    abusive, offensive, harassing, violent, hateful, or
                    otherwise objectionable
                  </li>
                  <li>
                    Involve commercial activities or sales without our prior
                    written consent
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.section>

          {/* 4. Intellectual Property Rights */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("ip")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                4. Intellectual Property Rights
              </h2>
              {openSections.ip ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.ip ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Our Content:</strong> The Service and its original
                  content, features, and functionality are owned by Codify and
                  are protected by international copyright, trademark, patent,
                  trade secret, and other intellectual property or proprietary
                  rights laws.
                </p>
                <p>
                  <strong>Your Content:</strong> You retain all ownership rights
                  to the content you create and submit to the Service. By
                  submitting content to Codify, you grant us a worldwide,
                  non-exclusive, royalty-free, sublicensable, and transferable
                  license to use, reproduce, distribute, prepare derivative
                  works of, display, and perform your content in connection with
                  the Service.
                </p>
                <p>
                  <strong>Course Materials:</strong> All course materials,
                  including but not limited to videos, exercises, code samples,
                  and documentation, are provided for your personal,
                  non-commercial use only. You may not share, redistribute, or
                  sell these materials.
                </p>
                <p>
                  <strong>Trademarks:</strong> The Codify name, logo, and all
                  related names, logos, product and service names, designs, and
                  slogans are trademarks of Codify. You may not use these marks
                  without our prior written permission.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* 5. Service Availability & Termination */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("termination")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                5. Service Availability & Termination
              </h2>
              {openSections.termination ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.termination ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Service Availability:</strong> We strive to maintain
                  the availability of our Service but do not guarantee that the
                  Service will be available at all times. We may perform
                  maintenance on the Service which may result in interruptions,
                  delays, or errors.
                </p>
                <p>
                  <strong>Termination by You:</strong> You may terminate your
                  account at any time by contacting us or through your account
                  settings.
                </p>
                <p>
                  <strong>Termination by Us:</strong> We may suspend or
                  terminate your access to the Service immediately, without
                  prior notice or liability, for any reason, including if you
                  breach these Terms. Upon termination, your right to use the
                  Service will immediately cease.
                </p>
                <p>
                  <strong>Effect of Termination:</strong> Upon termination, all
                  provisions of these Terms which by their nature should survive
                  termination shall survive, including ownership provisions,
                  warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* 6. Limitation of Liability */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("liability")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                6. Limitation of Liability
              </h2>
              {openSections.liability ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.liability ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  To the fullest extent permitted by applicable law, in no event
                  shall Codify, its affiliates, directors, employees, or
                  licensors be liable for any indirect, punitive, incidental,
                  special, consequential, or exemplary damages, including
                  without limitation damages for loss of profits, goodwill, use,
                  data, or other intangible losses, arising out of or relating
                  to the use of, or inability to use, the Service.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, Codify
                  assumes no liability or responsibility for any:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Errors, mistakes, or inaccuracies of content</li>
                  <li>
                    Personal injury or property damage resulting from your
                    access to or use of our Service
                  </li>
                  <li>
                    Unauthorized access to or use of our servers and/or any
                    personal information stored therein
                  </li>
                  <li>
                    Interruption or cessation of transmission to or from the
                    Service
                  </li>
                  <li>
                    Bugs, viruses, or the like that may be transmitted to or
                    through our Service
                  </li>
                </ul>
                <p>
                  Our total cumulative liability to you for all claims arising
                  from or relating to these Terms or your use of the Service
                  shall not exceed the amount you paid to us for the Service in
                  the six months preceding the event giving rise to the claim.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* 7. Privacy & Data Protection */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("privacy")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                7. Privacy & Data Protection
              </h2>
              {openSections.privacy ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.privacy ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains
                  how we collect, use, and protect your personal information. By
                  using our services, you agree to the collection and use of
                  information in accordance with our Privacy Policy.
                </p>
                <p>
                  <strong>Data Collection:</strong> We collect information that
                  you provide directly to us, including when you create an
                  account, update your profile, make a purchase, or contact us
                  for support.
                </p>
                <p>
                  <strong>Data Usage:</strong> We use your information to
                  provide, maintain, and improve our services, to develop new
                  services, and to protect Codify and our users.
                </p>
                <p>
                  <strong>Data Sharing:</strong> We may share your information
                  with third parties in limited circumstances, including with
                  your consent, with service providers, for legal reasons, or in
                  connection with a sale or merger of our business.
                </p>
                <Link
                  to="/privacy"
                  className="inline-flex items-center text-primary hover:underline mt-2"
                >
                  View our complete Privacy Policy{" "}
                  <FaExternalLinkAlt className="ml-1 text-xs" />
                </Link>
              </div>
            </motion.div>
          </motion.section>

          {/* 8. Updates & Modifications */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <button
              onClick={() => toggleSection("updates")}
              className="flex justify-between items-center w-full text-left"
            >
              <h2 className="text-2xl font-semibold text-primary">
                8. Updates & Modifications
              </h2>
              {openSections.updates ? (
                <FaChevronUp className="text-primary" />
              ) : (
                <FaChevronDown className="text-primary" />
              )}
            </button>
            <motion.div
              variants={sectionVariants}
              initial="closed"
              animate={openSections.updates ? "open" : "closed"}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Service Modifications:</strong> We reserve the right
                  to modify, suspend, or discontinue, temporarily or
                  permanently, the Service or any service to which it connects,
                  with or without notice and without liability to you.
                </p>
                <p>
                  <strong>Terms Updates:</strong> We may revise these Terms from
                  time to time. The most current version will always be posted
                  on our website. By continuing to access or use our Service
                  after those revisions become effective, you agree to be bound
                  by the revised Terms.
                </p>
                <p>
                  <strong>Notification of Changes:</strong> If we make material
                  changes to these Terms, we will notify you either through the
                  email address you have provided us or by placing a prominent
                  notice on our website.
                </p>
                <p>
                  <strong>Your Acceptance:</strong> Your continued use of our
                  Service following the posting of changes to these Terms means
                  that you accept and agree to the changes. You are expected to
                  check this page frequently so you are aware of any changes.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            variants={itemVariants}
            className={`p-6 rounded-2xl shadow-lg ${
              isDark
                ? "bg-dark-card border border-dark-border"
                : "bg-light-card border border-light-border"
            }`}
          >
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please :
            </p>
            <Link
              to="/contact"
              className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
            >
              <span className="mr-2 text-primary text-xs">▸</span>
              Contact Us
            </Link>
          </motion.section>
        </motion.div>

        {/* Acceptance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className={`mt-12 p-6 rounded-2xl text-center shadow-lg ${
            isDark
              ? "bg-dark-card border border-dark-border"
              : "bg-light-card border border-light-border"
          }`}
        >
          <p className="text-lg font-semibold">
            By using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Terms;
