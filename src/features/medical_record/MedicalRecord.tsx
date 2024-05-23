"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getResourceBundle } from "@/server/getResourceBundle";
import { BundleEntry } from "@/types/Bundle";
import { Questionnaire } from "@/types/Questionnaire";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionnaireResponseForm from "../questionnaires/components/QuestionnaireResponseForm";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DynamicTabs = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const [questionnaires, setQuestionnaires] = useState<
    BundleEntry<Questionnaire>[]
  >([]);
  const [tabs, setTabs] = useState([
    {
      id: "default",
      label: "Default",
      questionnaireId: null,
      content: (
        <SelectDemoContainer
          onSelect={(q: Questionnaire) =>
            handleQuestionnaireSelect("default", q)
          }
        />
      ),
    },
  ]);
  const [activeTab, setActiveTab] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResourceBundle({
          resourceType: "Questionnaire",
          access_token: session?.user?.access_token,
        });
        setQuestionnaires(data.entry ?? []);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };
    fetchData();
  }, [session?.user?.access_token]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleQuestionnaireSelect = (
    tabId: string,
    questionnaire: Questionnaire
  ) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const tabIndex = newTabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex !== -1) {
        newTabs[tabIndex] = {
          ...newTabs[tabIndex],
          label: questionnaire.title ?? "",
          content: (
            <div>
              <SelectDemo
                questionnaires={questionnaires}
                onSelect={(q) => handleQuestionnaireSelect(tabId, q)}
              />
              <QuestionnaireResponseForm questionnaire={questionnaire} />
            </div>
          ),
        };
      }
      return newTabs;
    });
  };

  const addTab = () => {
    const newTabId = `tab-${tabs.length}`;
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        id: newTabId,
        label: `Tab ${tabs.length + 1}`,
        questionnaireId: null,
        content: (
          <div>
            <SelectDemo
              questionnaires={questionnaires}
              onSelect={(questionnaire) =>
                handleQuestionnaireSelect(newTabId, questionnaire)
              }
            />
          </div>
        ),
      },
    ]);
    setActiveTab(newTabId);
  };

  return (
    <div>
      <Tabs defaultValue="default" value={activeTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      <Button
        onClick={addTab}
        className="mt-2 p-1 border rounded bg-blue-500 text-white"
      >
        Add Tab
      </Button>
    </div>
  );
};

interface SelectDemoProps {
  questionnaires: BundleEntry<Questionnaire>[];
  onSelect: (questionnaire: Questionnaire) => void;
}

const SelectDemo = ({ questionnaires, onSelect }: SelectDemoProps) => {
  return (
    <Select onValueChange={(value) => onSelect(JSON.parse(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Questionnaire" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {questionnaires.map((questionnaire) => (
            <SelectItem
              key={questionnaire.resource?.id}
              value={JSON.stringify(questionnaire.resource)}
            >
              {questionnaire.resource?.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const SelectDemoContainer = ({
  onSelect,
}: {
  onSelect: (questionnaire: Questionnaire) => void;
}) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  const [questionnaires, setQuestionnaires] = useState<
    BundleEntry<Questionnaire>[]
  >([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResourceBundle({
          resourceType: "Questionnaire",
          access_token: session?.user?.access_token,
        });
        setQuestionnaires(data.entry ?? []);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };
    fetchData();
  }, [session?.user?.access_token]);

  return (
    <div>
      <SelectDemo
        questionnaires={questionnaires}
        onSelect={(q) => {
          setSelectedQuestionnaire(q);
          onSelect(q);
        }}
      />
      {selectedQuestionnaire && (
        <QuestionnaireResponseForm questionnaire={selectedQuestionnaire} />
      )}
    </div>
  );
};

export default DynamicTabs;
