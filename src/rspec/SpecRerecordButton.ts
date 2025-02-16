import * as vscode from 'vscode';
import SpecRunnerConfig from '../SpecRunnerConfig';

export class SpecRerecordButton {
  button: vscode.StatusBarItem;
  private config: SpecRunnerConfig;

  constructor(button: vscode.StatusBarItem, config: SpecRunnerConfig) {
    this.button = button;
    this.config = config;
  }

  update(editor = vscode.window.activeTextEditor) {
    if (!editor || !this.config.rspecRerecordButton) {
      this.button.hide();
      return;
    }

    const doc = editor.document;
    if (doc.languageId !== 'ruby' || !doc.fileName.match(/_spec\.rb$/)) {
      this.button.hide();
      return;
    }

    this.button.text = '$(testing-run-icon) Rerecord spec';
    this.button.command = 'ruby-spec-runner.rerecordRspecFile';
    this.button.show();
  }
}
