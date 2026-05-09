import { Link } from "react-router";
import Header from "../components/ui/Header";
import ImportantNotice from "../components/rulesPolicies/ImportantNotice";
import PolicySection from "../components/rulesPolicies/PolicySection";
import PolicySubsection from "../components/rulesPolicies/PolicySubsection";
import { policiesData } from "../constant/RulesPoliciesText";

export default function Policies() {
  return (
    <div className="max-w-4xl mx-auto">
      <Header
        title="Platform Policies"
        desc="Understand how Verity handles privacy, moderation, and platform usage."
      />

      <ImportantNotice>
        These policies govern your use of Verity and
        describe how we collect, use, and protect your
        information.
      </ImportantNotice>

      <div className="space-y-8">
          {policiesData.map((policy) => (
            <PolicySection
              key={policy.title}
              title={policy.title}
              icon={policy.icon}
            >
              {policy.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-foreground mb-2">
                    {section.heading}
                  </h3>

                  <div className="space-y-2 ml-4">
                    {section.items.map((item, index) => (
                      <p key={index}>
                        {item.title && (
                          <strong className="text-foreground">
                            {item.title}{" "}
                          </strong>
                        )}

                        {item.description}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </PolicySection>
          ))}
        </div>
    </div>
  );
}