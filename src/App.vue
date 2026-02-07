<script setup>
import ParticlesBackground from './components/ParticlesBackground.vue';
import NavBar from './components/NavBar.vue';
import OverviewSection from './components/OverviewSection.vue';
import EducationSection from './components/EducationSection.vue';
import ResearchInterestsSection from './components/ResearchInterestsSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import PublicationsSection from './components/PublicationsSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import AwardsSection from './components/AwardsSection.vue';
import FooterSection from './components/FooterSection.vue';
import BackToTopButton from './components/BackToTopButton.vue';
</script>

<template>
  <div class="app">
    <!-- Global Particles Background -->
    <ParticlesBackground />
    
    <!-- Navigation Bar -->
    <NavBar />
    
    <!-- Main Content Area -->
    <main class="main">
      <!-- Overview Section -->
      <OverviewSection />
      
      <!-- Education Section -->
      <section id="education">
        <EducationSection />
      </section>
      
      <!-- Research & Projects Section -->
      <section id="research-projects">
        <ResearchInterestsSection />
        <ProjectsSection />
      </section>
      
      <!-- Publications Section -->
      <section id="publications">
        <PublicationsSection />
      </section>
      
      <!-- Method & Skills Section -->
      <section id="skills">
        <SkillsSection />
      </section>
      
      <!-- Awards & Experience Section -->
      <section id="awards">
        <AwardsSection />
      </section>
    </main>
    
    <!-- Footer -->
    <FooterSection />
    
    <!-- Back to Top Button -->
    <BackToTopButton />
  </div>
</template>
