#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
require('dotenv').config();

const program = new Command();

program
  .name('aurion')
  .description('Aurion CLI - Collective Digital Immune System for AI')
  .version('1.0.0');

program
  .command('verify-text <text>')
  .description('Verify text content')
  .action(async (text) => {
    const spinner = ora('Verifying text with multi-agent consensus...').start();

    try {
      const { verifyText } = require('../../agent/src/verifier_text');
      const result = await verifyText(text);

      spinner.succeed('Verification complete!');

      console.log(chalk.bold('\nConsensus Results:'));
      console.log(chalk.cyan(`  Confidence: ${result.consensus.confidence}%`));
      console.log(chalk.cyan(`  Agreement: ${result.consensus.agreement}%`));
      console.log(chalk.cyan(`  Verdict: ${result.consensus.finalVerdict}`));

      console.log(chalk.bold('\nAgent Assessments:'));
      result.assessments.forEach(a => {
        console.log(chalk.gray(`  ${a.provider}: AI=${a.aiGenerated}% Factual=${a.factualScore}%`));
      });

      console.log(chalk.bold('\nProvenance:'));
      console.log(chalk.gray(`  Hash: ${result.provenance.contentHash.substring(0, 16)}...`));
      console.log(chalk.gray(`  Agents: ${result.provenance.agentCount}`));

    } catch (error) {
      spinner.fail('Verification failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('verify-image <file>')
  .description('Verify image for deepfakes')
  .action(async (file) => {
    const spinner = ora('Analyzing image for deepfakes...').start();

    try {
      const buffer = fs.readFileSync(file);
      const { verifyImage } = require('../../agent/src/verifier_image');
      const result = await verifyImage(buffer, 'image/png');

      spinner.succeed('Analysis complete!');

      console.log(chalk.bold('\nDeepfake Analysis:'));
      console.log(chalk.cyan(`  Deepfake Risk: ${result.consensus.averageScores.deepfakeRisk}%`));
      console.log(chalk.cyan(`  AI Generated: ${result.consensus.averageScores.aiGenerated}%`));
      console.log(chalk.cyan(`  Authenticity: ${result.consensus.averageScores.authenticityScore}%`));

    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('verify-video <file>')
  .description('Verify video for deepfakes')
  .action(async (file) => {
    const spinner = ora('Analyzing video for deepfakes...').start();

    try {
      const buffer = fs.readFileSync(file);
      const { verifyVideo } = require('../../agent/src/verifier_video');
      const result = await verifyVideo(buffer, 'video/mp4');

      spinner.succeed('Analysis complete!');

      console.log(chalk.bold('\nVideo Analysis:'));
      console.log(chalk.cyan(`  Deepfake Risk: ${result.consensus.averageScores.deepfakeRisk}%`));
      console.log(chalk.cyan(`  Manipulation: ${result.consensus.averageScores.manipulationScore}%`));

    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('publish <file>')
  .description('Publish Knowledge Asset to DKG')
  .action(async (file) => {
    const spinner = ora('Publishing to OriginTrail DKG...').start();

    try {
      const asset = JSON.parse(fs.readFileSync(file, 'utf8'));
      const { publishAsset } = require('../../dkg/src/publish');
      const result = await publishAsset(asset);

      spinner.succeed('Published successfully!');

      console.log(chalk.bold('\nPublished Asset:'));
      console.log(chalk.green(`  UAL: ${result.UAL}`));
      console.log(chalk.gray(`  Assertion ID: ${result.publicAssertionId}`));

    } catch (error) {
      spinner.fail('Publish failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('query <ual>')
  .description('Query Knowledge Asset from DKG')
  .action(async (ual) => {
    const spinner = ora('Querying DKG...').start();

    try {
      const { queryAsset } = require('../../dkg/src/query');
      const result = await queryAsset(ual);

      spinner.succeed('Query complete!');

      console.log(chalk.bold('\nAsset Data:'));
      console.log(JSON.stringify(result.assertion, null, 2));

    } catch (error) {
      spinner.fail('Query failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse();
