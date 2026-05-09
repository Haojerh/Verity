import { Link } from 'react-router';
import { BookOpen, Shield, AlertTriangle } from 'lucide-react';
import RuleSection from '../components/rulesPolicies/RuleSection';
import Header from '../components/ui/Header';
import { rulesData } from '../constant/RulesPoliciesText';
import ImportantNotice from '../components/rulesPolicies/ImportantNotice';

export default function Rules() {
  return (
      <div className="max-w-4xl mx-auto">
        <Header 
          title="Community Rules & Guidelines"
          desc="Please read the rules & guidelines carefully before using the platform"
        />

        <ImportantNotice>
            By accessing and using verity, you agree to abide by these community rules. Violation of these rules may result in warnings, temporary suspension, or permanent account termination at the discretion of our moderation team.
        </ImportantNotice>

        <div className="space-y-4">
            {rulesData.map((section, index) => (
                <RuleSection
                key={index}
                title={section.title}
                rules={section.rules}
                />
            ))}
        </div>
    </div>
  );
}
